import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { fetchTodos } from './store/todoSlice';
import { fetchCategories } from './store/categorySlice';
import type { Todo } from './types';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import CategoryForm from './components/CategoryForm';
import FilterControls from './components/FilterControls';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error, filter, sortBy } = useSelector((state: RootState) => state.todos);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { theme, toggleTheme } = useTheme();
  
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodos({ status: filter, sortBy }));
  }, [dispatch, filter, sortBy]);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowTodoForm(true);
  };

  const handleCloseForms = () => {
    setShowTodoForm(false);
    setShowCategoryForm(false);
    setEditingTodo(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <div className="header-actions">
          <button onClick={() => setShowTodoForm(true)}>Add Todo</button>
          <button onClick={() => setShowCategoryForm(true)}>Add Category</button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <FilterControls />
      
      <main>
        <TodoList
          todos={todos}
          categories={categories}
          onEditTodo={handleEditTodo}
        />
      </main>

      {showTodoForm && (
        <TodoForm
          categories={categories}
          editingTodo={editingTodo}
          onCancel={handleCloseForms}
        />
      )}

      {showCategoryForm && (
        <CategoryForm onCancel={handleCloseForms} />
      )}
    </div>
  );
}

export default App;
