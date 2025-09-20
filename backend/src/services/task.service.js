import Task from '../models/task.model.js';

class TaskService {
  // Create a new task
  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  // Get all tasks for a board
  async getTasksByBoard(boardId) {
    return await Task.find({ board: boardId });
  }

  // Get a single task by ID
  async getTaskById(id) {
    return await Task.findById(id);
  }

  // Update a task
  async updateTask(id, taskData) {
    return await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true
    });
  }

  // Delete a task
  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }

  // Update task status
  async updateTaskStatus(id, status) {
    return await Task.findByIdAndUpdate(id, { status }, {
      new: true,
      runValidators: true
    });
  }
}

export default new TaskService();