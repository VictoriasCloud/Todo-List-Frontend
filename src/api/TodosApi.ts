import axios from 'axios';

const BASE_URL = 'https://cms.laurence.host/api';

export const TodosApi = {
  getTodos: (params = {}) =>
    axios.get(`${BASE_URL}/tasks`, { params }),

  getTodoById: (id: number) =>
    axios.get(`${BASE_URL}/tasks/${id}`),

  createTodo: (Todo: { title: string; description: string; status: string }) =>
    axios.post(`${BASE_URL}/tasks`, { data: Todo }),

  updateTodo: (id: number, updatedFields: { title?: string; description?: string; status?: string }) =>
    axios.put(`${BASE_URL}/tasks/${id}`, { data: updatedFields }),

  deleteTodo: (id: number) =>
    axios.delete(`${BASE_URL}/tasks/${id}`),
};
