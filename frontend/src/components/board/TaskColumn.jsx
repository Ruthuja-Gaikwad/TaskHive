import { motion } from 'framer-motion';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, status, onEditTask, onDeleteTask }) => {
  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'bg-gray-50';
      case 'in-progress':
        return 'bg-blue-50';
      case 'done':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`rounded-2xl p-4 ${getColumnColor()}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-100/50 rounded-xl' : ''
            }`}
          >
            <motion.div layout className="space-y-3">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </motion.div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;