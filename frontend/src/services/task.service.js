import axiosInstance from '../utils/axios';

export const TaskService = {
  createTask: async (data) => {
    const response = await axiosInstance.post('/tasks', data);
    return response.data;
  },

  getTasksByBoard: async (boardId) => {
    const response = await axiosInstance.get(`/tasks/board/${boardId}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id, data) => {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },

  updateTaskStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },
};