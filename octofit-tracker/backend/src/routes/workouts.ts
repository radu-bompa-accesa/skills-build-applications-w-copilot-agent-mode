import { Router, Request, Response } from 'express';

const router = Router();

// Get all workouts
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all workouts' });
});

// Get workout by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get workout ${req.params.id}` });
});

// Create a new workout
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new workout', body: req.body });
});

// Update workout
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update workout ${req.params.id}`, body: req.body });
});

// Delete workout
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete workout ${req.params.id}` });
});

export default router;