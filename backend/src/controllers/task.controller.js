import taskService from '../services/task.service.js';

class TaskController {
  // Create a new task
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all tasks for a board
  async getTasksByBoard(req, res) {
    try {
      const tasks = await taskService.getTasksByBoard(req.params.boardId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single task
  async getTaskById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a task
  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a task
  async deleteTask(req, res) {
    try {
      const task = await taskService.deleteTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update task status
  async updateTaskStatus(req, res) {
    try {
      const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TaskController();