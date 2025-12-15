import { Todo, Category } from './types';

class InMemoryDatabase {
  private todos: Todo[] = [];
  private categories: Category[] = [];

  constructor() {
    // Initialize with default categories
    this.categories.push(
      {
        id: '1',
        name: 'Work',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Personal',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Shopping',
        createdAt: new Date().toISOString()
      }
    );

    // Add some sample todos
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    this.todos.push(
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the quarterly project proposal and submit to management',
        dueDate: tomorrow.toISOString(),
        categoryId: '1',
        completed: false,
        createdAt: now.toISOString()
      },
      {
        id: '2',
        title: 'Buy groceries',
        description: 'Milk, bread, eggs, and vegetables for the week',
        dueDate: tomorrow.toISOString(),
        categoryId: '3',
        completed: false,
        createdAt: now.toISOString()
      },
      {
        id: '3',
        title: 'Schedule dentist appointment',
        description: 'Call Dr. Smith to schedule routine cleaning',
        dueDate: nextWeek.toISOString(),
        categoryId: '2',
        completed: true,
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      }
    );
  }

  // Todo operations
  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    this.todos[index] = { ...this.todos[index], ...updates };
    return this.todos[index];
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    
    this.todos.splice(index, 1);
    return true;
  }

  // Category operations
  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(category => category.id === id);
  }

  createCategory(category: Omit<Category, 'id' | 'createdAt'>): Category {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.categories.push(newCategory);
    return newCategory;
  }
}

export const db = new InMemoryDatabase();