import mongoose from 'mongoose';
import Board from '../models/board.model.js';

class BoardService {
  // Create a new board
  async createBoard(boardData) {
    const board = new Board(boardData);
    return await board.save();
  }

  // Get all boards
  async getAllBoards() {
    return await Board.find().populate('tasks');
  }

  // Get a single board by ID
  async getBoardById(id) {
    return await Board.findById(id).populate('tasks');
  }

  // Update a board
  async updateBoard(id, boardData) {
    return await Board.findByIdAndUpdate(id, boardData, {
      new: true,
      runValidators: true
    }).populate('tasks');
  }

  // Delete a board
  async deleteBoard(id) {
    const board = await Board.findById(id);
    if (!board) {
      throw new Error('Board not found');
    }
    
    // Delete all associated tasks first
    await mongoose.model('Task').deleteMany({ board: id });
    
    // Then delete the board
    await Board.findByIdAndDelete(id);
    
    return board;
  }
}

export default new BoardService();