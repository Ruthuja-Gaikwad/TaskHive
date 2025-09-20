import express from 'express';
import taskController from '../controllers/task.controller.js';

const router = express.Router();

// Create a new task
router.post('/', taskController.createTask);

// Get all tasks for a board
router.get('/board/:boardId', taskController.getTasksByBoard);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

// Update task status
router.patch('/:id/status', taskController.updateTaskStatus);

export default router;