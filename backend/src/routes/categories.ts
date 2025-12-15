import { Router, Request, Response } from 'express';
import { db } from '../database';
import { CreateCategoryRequest } from '../types';

const router = Router();

// GET /api/categories - Get all categories
router.get('/', (req: Request, res: Response) => {
  try {
    const categories = db.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/:id - Get a specific category
router.get('/:id', (req: Request, res: Response) => {
  try {
    const category = db.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// POST /api/categories - Create a new category
router.post('/', (req: Request, res: Response) => {
  try {
    const { name }: CreateCategoryRequest = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    
    const category = db.createCategory({ name: name.trim() });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;