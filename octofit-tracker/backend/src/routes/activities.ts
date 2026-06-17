import { Router, Request, Response } from 'express';

const router = Router();

// Get all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities' });
});

// Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get activity ${req.params.id}` });
});

// Create a new activity
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new activity', body: req.body });
});

// Update activity
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update activity ${req.params.id}`, body: req.body });
});

// Delete activity
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete activity ${req.params.id}` });
});

export default router;