import axios from 'axios';
import type { Todo, Category, CreateTodoRequest, UpdateTodoRequest, CreateCategoryRequest, FilterStatus, SortBy } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const todoApi = {
  getTodos: (status?: FilterStatus, sortBy?: SortBy) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (sortBy) params.append('sortBy', sortBy);
    return api.get<Todo[]>(`/todos?${params.toString()}`);
  },
  
  getTodo: (id: string) => api.get<Todo>(`/todos/${id}`),
  
  createTodo: (todo: CreateTodoRequest) => api.post<Todo>('/todos', todo),
  
  updateTodo: (id: string, updates: UpdateTodoRequest) => api.put<Todo>(`/todos/${id}`, updates),
  
  deleteTodo: (id: string) => api.delete(`/todos/${id}`),
};

export const categoryApi = {
  getCategories: () => api.get<Category[]>('/categories'),
  
  getCategory: (id: string) => api.get<Category>(`/categories/${id}`),
  
  createCategory: (category: CreateCategoryRequest) => api.post<Category>('/categories', category),
};