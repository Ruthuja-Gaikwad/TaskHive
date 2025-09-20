import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardService } from '../services/board.service';
import { TaskService } from '../services/task.service';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    loadBoard();
  }, [id]);

  const loadBoard = async () => {
    try {
      const boardData = await BoardService.getBoardById(id);
      setBoard(boardData);
      const tasksData = await TaskService.getTasksByBoard(id);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading board:', error);
      navigate('/');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await TaskService.createTask({
        ...taskData,
        board: id
      });
      setTasks([...tasks, newTask]);
      setIsAddingTask(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    try {
      const updatedTask = await TaskService.updateTaskStatus(draggableId, newStatus);
      setTasks(tasks.map(task => 
        task._id === draggableId ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="btn btn-primary"
        >
          Add Task
        </button>
      </div>

      {isAddingTask && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsAddingTask(false)}
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Droppable droppableId="todo">
            {(provided) => (
              <TaskColumn
                title="To Do"
                tasks={getTasksByStatus('todo')}
                onDeleteTask={handleDeleteTask}
                provided={provided}
              />
            )}
          </Droppable>

          <Droppable droppableId="in-progress">
            {(provided) => (
              <TaskColumn
                title="In Progress"
                tasks={getTasksByStatus('in-progress')}
                onDeleteTask={handleDeleteTask}
                provided={provided}
              />
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided) => (
              <TaskColumn
                title="Done"
                tasks={getTasksByStatus('done')}
                onDeleteTask={handleDeleteTask}
                provided={provided}
              />
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default BoardDetail;