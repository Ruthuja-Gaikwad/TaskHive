import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { CalendarIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const isOverdue = new Date(task.deadline) < new Date();
  const isDueSoon = new Date(task.deadline) - new Date() < 1000 * 60 * 60 * 24 * 2; // 2 days

  const getDeadlineColor = () => {
    if (isOverdue) return 'bg-red-100 text-red-800';
    if (isDueSoon) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all
              ${snapshot.isDragging ? 'shadow-lg ring-2 ring-primary-400' : ''}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900">{task.title}</h4>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(task)}
                  className="p-1 rounded text-gray-500 hover:bg-gray-100"
                >
                  <PencilIcon className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(task._id)}
                  className="p-1 rounded text-red-500 hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{task.description}</p>

            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span className={`text-xs px-2 py-1 rounded-full ${getDeadlineColor()}`}>
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;