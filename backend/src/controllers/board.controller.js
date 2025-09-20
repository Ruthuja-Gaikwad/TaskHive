import boardService from '../services/board.service.js';

class BoardController {
  // Create a new board
  async createBoard(req, res) {
    try {
      const board = await boardService.createBoard(req.body);
      res.status(201).json(board);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all boards
  async getAllBoards(req, res) {
    try {
      const boards = await boardService.getAllBoards();
      res.json(boards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single board
  async getBoardById(req, res) {
    try {
      const board = await boardService.getBoardById(req.params.id);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a board
  async updateBoard(req, res) {
    try {
      const board = await boardService.updateBoard(req.params.id, req.body);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a board
  async deleteBoard(req, res) {
    try {
      const board = await boardService.deleteBoard(req.params.id);
      res.json({ message: 'Board deleted successfully', board });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new BoardController();