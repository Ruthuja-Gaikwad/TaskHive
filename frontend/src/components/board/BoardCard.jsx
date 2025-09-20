import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/outline';

const BoardCard = ({ board, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      try {
        await onDelete(board._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <motion.h3
            layout="position"
            className="text-xl font-semibold text-gray-900"
          >
            {board.name}
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors
              ${isDeleting ? 'animate-shake' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>

        <p className="mt-2 text-gray-600">{board.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {board.tasks?.length || 0} tasks
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 
              text-white rounded-lg font-medium shadow-sm hover:shadow-md 
              transition-shadow"
          >
            View Board →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardCard;