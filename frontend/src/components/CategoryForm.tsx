import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../store/categorySlice';
import type { AppDispatch } from '../store';

interface CategoryFormProps {
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    dispatch(createCategory({ name: name.trim() }));
    onCancel();
  };

  return (
    <div className="category-form-overlay">
      <form className="category-form" onSubmit={handleSubmit}>
        <h2>Add New Category</h2>
        
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <div className="form-actions">
          <button type="submit">Create</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;