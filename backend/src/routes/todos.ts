import { Router, Request, Response } from 'express';
import { db } from '../database';
import { CreateTodoRequest, UpdateTodoRequest } from '../types';

const router = Router();

// GET /api/todos - Get all todos with optional filtering and sorting
router.get('/', (req: Request, res: Response) => {
  try {
    let todos = db.getAllTodos();
    
    // Filter by completion status
    const { status, sortBy } = req.query;
    if (status === 'active') {
      todos = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      todos = todos.filter(todo => todo.completed);
    }
    
    // Sort todos
    if (sortBy === 'dueDate') {
      todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortBy === 'createdAt') {
      todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', (req: Request, res: Response) => {
  try {
    const todo = db.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST /api/todos - Create a new todo
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, categoryId }: CreateTodoRequest = req.body;
    
    // Validation
    if (!title || !description || !dueDate || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if category exists
    const category = db.getCategoryById(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }
    
    const todo = db.createTodo({
      title,
      description,
      dueDate,
      categoryId,
      completed: false
    });
    
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, categoryId, completed }: UpdateTodoRequest = req.body;
    
    // Check if category exists (if provided)
    if (categoryId) {
      const category = db.getCategoryById(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }
    
    const updatedTodo = db.updateTodo(req.params.id, {
      title,
      description,
      dueDate,
      categoryId,
      completed
    });
    
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteTodo(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;