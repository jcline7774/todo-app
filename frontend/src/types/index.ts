export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  completed?: boolean;
}

export interface CreateCategoryRequest {
  name: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'createdAt';