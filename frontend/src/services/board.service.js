import axiosInstance from '../utils/axios';

export const BoardService = {
  createBoard: async (data) => {
    const response = await axiosInstance.post('/boards', data);
    return response.data;
  },

  getAllBoards: async () => {
    const response = await axiosInstance.get('/boards');
    return response.data;
  },

  getBoardById: async (id) => {
    const response = await axiosInstance.get(`/boards/${id}`);
    return response.data;
  },

  updateBoard: async (id, data) => {
    const response = await axiosInstance.put(`/boards/${id}`, data);
    return response.data;
  },

  deleteBoard: async (id) => {
    const response = await axiosInstance.delete(`/boards/${id}`);
    return response.data;
  },
};