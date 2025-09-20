import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {task.description}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(task.status)}`}>
                  {task.status}
                </span>
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;