import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onDeleteTask, provided }) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Draggable
            key={task._id}
            draggableId={task._id}
            index={index}
          >
            {(provided, snapshot) => (
              <TaskCard
                task={task}
                onDelete={onDeleteTask}
                provided={provided}
                isDragging={snapshot.isDragging}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default TaskColumn;