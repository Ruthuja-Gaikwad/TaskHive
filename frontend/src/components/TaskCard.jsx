import { useState } from 'react';
import { TaskService } from '../services/task.service';

const TaskCard = ({ task, onDelete, provided, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleUpdate = async () => {
    try {
      await TaskService.updateTask(task._id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`card ${
        isDragging ? 'shadow-lg ring-2 ring-primary' : ''
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full px-2 py-1 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={new Date(editedTask.deadline).toISOString().split('T')[0]}
            onChange={(e) =>
              setEditedTask({ ...editedTask, deadline: e.target.value })
            }
            className="w-full px-2 py-1 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold">{task.title}</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Deadline: {formatDate(task.deadline)}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;