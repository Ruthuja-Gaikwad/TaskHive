import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BoardService } from '../services/board.service';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const data = await BoardService.getAllBoards();
      setBoards(data);
    } catch (error) {
      console.error('Error loading boards:', error);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    try {
      const newBoard = await BoardService.createBoard({
        name: newBoardName,
        description: ''
      });
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      await BoardService.deleteBoard(id);
      setBoards(boards.filter(board => board._id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Boards</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="btn btn-primary"
        >
          Create Board
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateBoard} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div key={board._id} className="card hover:shadow-lg">
            <div className="flex justify-between items-start">
              <Link
                to={`/board/${board._id}`}
                className="text-xl font-semibold text-gray-900 hover:text-primary"
              >
                {board.name}
              </Link>
              <button
                onClick={() => handleDeleteBoard(board._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              {board.tasks?.length || 0} tasks
            </p>
            <div className="mt-4 flex justify-end">
              <Link
                to={`/board/${board._id}`}
                className="text-primary hover:text-primary/80"
              >
                View Board →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;