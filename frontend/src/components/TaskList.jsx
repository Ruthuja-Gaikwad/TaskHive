import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';

function TaskList() {
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch boards on component mount
  useEffect(() => {
    fetchBoards();
  }, []);

  // Fetch tasks when board is selected
  useEffect(() => {
    if (selectedBoard) {
      fetchTasks();
    }
  }, [selectedBoard]);

  // Function to fetch boards
  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards');
      setBoards(response.data);
      if (response.data.length > 0) {
        setSelectedBoard(response.data[0]._id);
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching boards');
      setLoading(false);
    }
  };

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/board/${selectedBoard}`);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Error deleting task');
    }
  };

  // Function to handle task edits
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Function to save edited task
  const handleSaveTask = async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => 
        task._id === updatedTask._id ? response.data : task
      ));
      setEditingTask(null);
    } catch (err) {
      setError('Error updating task');
    }
  };

  // Function to move task to different status
  const handleMoveTask = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;

      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        ...task,
        status: newStatus
      });

      setTasks(tasks.map(t => 
        t._id === taskId ? response.data : t
      ));
    } catch (err) {
      setError('Error moving task');
    }
  };

  // Function to get status badge styles
  const getStatusStyles = (status) => {
    const styles = {
      todo: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      done: 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="block w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a board</option>
          {boards.map(board => (
            <option key={board._id} value={board._id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedBoard && (
        <div className="text-center py-8">
          <p className="text-gray-500">Please select a board to view tasks</p>
        </div>
      )}

      {selectedBoard && tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found in this board</p>
        </div>
      )}

      {selectedBoard && tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Todo Column */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
              To Do
            </h3>
            <div className="space-y-4">
              {tasks.filter(task => task.status === 'todo').map(task => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleMoveTask(task._id, 'in-progress')}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              In Progress
            </h3>
            <div className="space-y-4">
              {tasks.filter(task => task.status === 'in-progress').map(task => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleMoveTask(task._id, 'done')}
                        className="text-gray-600 hover:text-green-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              Done
            </h3>
            <div className="space-y-4">
              {tasks.filter(task => task.status === 'done').map(task => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default TaskList;