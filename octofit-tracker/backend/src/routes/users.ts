import { Router, Request, Response } from 'express';

const router = Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users' });
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// Create a new user
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new user', body: req.body });
});

// Update user
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update user ${req.params.id}`, body: req.body });
});

// Delete user
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default router;