import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Todo, Category } from '../types';
import { updateTodo, deleteTodo } from '../store/todoSlice';
import type { AppDispatch } from '../store';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, categories, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isExpanded, setIsExpanded] = useState(false);

  const category = categories.find(cat => cat.id === todo.categoryId);
  
  const handleToggleComplete = () => {
    dispatch(updateTodo({ 
      id: todo.id, 
      updates: { completed: !todo.completed } 
    }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
        <h3 onClick={() => setIsExpanded(!isExpanded)}>{todo.title}</h3>
        <span className="category-badge">{category?.name}</span>
        <div className="todo-actions">
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="todo-details">
          <p>{todo.description}</p>
          <div className="todo-meta">
            <span>Due: {formatDate(todo.dueDate)}</span>
            <span>Created: {formatDate(todo.createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;