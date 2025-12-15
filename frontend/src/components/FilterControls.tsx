import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { FilterStatus, SortBy } from '../types';
import { setFilter, setSortBy } from '../store/todoSlice';
import type { RootState, AppDispatch } from '../store';

const FilterControls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter, sortBy } = useSelector((state: RootState) => state.todos);

  const handleFilterChange = (newFilter: FilterStatus) => {
    dispatch(setFilter(newFilter));
  };

  const handleSortChange = (newSort: SortBy) => {
    dispatch(setSortBy(newSort));
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label>Filter:</label>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <div className="sort-group">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortBy)}
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;