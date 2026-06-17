import express, { Router, Request, Response } from 'express';
import { GoalService } from '../services/GoalService';

const router: Router = express.Router();
const goalService = new GoalService();

// GET all goals for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const goals = await goalService.getGoalsByUserId(req.params.userId);
    res.json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET goal by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await goalService.getGoalById(req.params.id);
    if (!goal) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// CREATE new goal
router.post('/', async (req: Request, res: Response) => {
  try {
    const goal = await goalService.createGoal(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// UPDATE goal
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await goalService.updateGoal(req.params.id, req.body);
    if (!goal) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// DELETE goal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await goalService.deleteGoal(req.params.id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// COMPLETE a goal
router.patch('/:id/complete', async (req: Request, res: Response) => {
  try {
    const goal = await goalService.completeGoal(req.params.id);
    if (!goal) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET active goals for a user
router.get('/user/:userId/active', async (req: Request, res: Response) => {
  try {
    const goals = await goalService.getActiveGoalsByUserId(req.params.userId);
    res.json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
