import React from 'react';
import type { Todo, Category } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
  onEditTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, categories, onEditTodo }) => {
  // Group todos by category
  const todosByCategory = todos.reduce((acc, todo) => {
    const categoryId = todo.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  if (todos.length === 0) {
    return <div className="empty-state">No todos found</div>;
  }

  return (
    <div className="todo-list">
      {Object.entries(todosByCategory).map(([categoryId, categoryTodos]) => {
        const category = categories.find(cat => cat.id === categoryId);
        return (
          <div key={categoryId} className="category-section">
            <h2 className="category-title">{category?.name || 'Unknown Category'}</h2>
            <div className="todos">
              {categoryTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  categories={categories}
                  onEdit={onEditTodo}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;