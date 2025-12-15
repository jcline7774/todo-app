import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { Todo, Category, CreateTodoRequest } from '../types';
import { createTodo, updateTodo } from '../store/todoSlice';
import type { AppDispatch } from '../store';

interface TodoFormProps {
  categories: Category[];
  editingTodo?: Todo | null;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ categories, editingTodo, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    categoryId: '',
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: editingTodo.dueDate.split('T')[0], // Format for date input
        categoryId: editingTodo.categoryId,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        categoryId: categories[0]?.id || '',
      });
    }
  }, [editingTodo, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.dueDate || !formData.categoryId) {
      alert('Please fill in all fields');
      return;
    }

    if (editingTodo) {
      dispatch(updateTodo({
        id: editingTodo.id,
        updates: {
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString(),
        }
      }));
    } else {
      const todoRequest: CreateTodoRequest = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      };
      dispatch(createTodo(todoRequest));
    }
    
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="todo-form-overlay">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h2>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
        
        <input
          type="text"
          name="title"
          placeholder="Todo title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <div className="form-actions">
          <button type="submit">
            {editingTodo ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;