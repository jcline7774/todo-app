import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, CreateTodoRequest, UpdateTodoRequest, FilterStatus, SortBy } from '../types';
import { todoApi } from '../services/api';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filter: FilterStatus;
  sortBy: SortBy;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  sortBy: 'createdAt',
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ status, sortBy }: { status?: FilterStatus; sortBy?: SortBy }) => {
    const response = await todoApi.getTodos(status, sortBy);
    return response.data;
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: CreateTodoRequest) => {
    const response = await todoApi.createTodo(todo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }: { id: string; updates: UpdateTodoRequest }) => {
    const response = await todoApi.updateTodo(id, updates);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await todoApi.deleteTodo(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export const { setFilter, setSortBy, clearError } = todoSlice.actions;
export default todoSlice.reducer;