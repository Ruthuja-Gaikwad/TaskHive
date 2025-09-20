import express from 'express';
import boardController from '../controllers/board.controller.js';
import { validateBoard } from '../middleware/validation.js';

const router = express.Router();

// Create a new board
router.post('/', validateBoard, boardController.createBoard);

// Get all boards
router.get('/', boardController.getAllBoards);

// Get a single board by ID
router.get('/:id', boardController.getBoardById);

// Update a board
router.put('/:id', boardController.updateBoard);

// Delete a board
router.delete('/:id', boardController.deleteBoard);

export default router;