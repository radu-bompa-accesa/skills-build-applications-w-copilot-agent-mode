import { Router, Request, Response } from 'express';

const router = Router();

// Get all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams' });
});

// Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get team ${req.params.id}` });
});

// Create a new team
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new team', body: req.body });
});

// Update team
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update team ${req.params.id}`, body: req.body });
});

// Delete team
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete team ${req.params.id}` });
});

export default router;