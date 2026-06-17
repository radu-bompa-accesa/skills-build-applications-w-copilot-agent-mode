import express, { Router, Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';

const router: Router = express.Router();
const workoutService = new WorkoutService();

// GET all workouts for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await workoutService.getWorkoutsByUserId(req.params.userId);
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await workoutService.getWorkoutById(req.params.id);
    if (!workout) {
      res.status(404).json({ success: false, error: 'Workout not found' });
      return;
    }
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// CREATE new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await workoutService.createWorkout(req.body);
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// UPDATE workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await workoutService.updateWorkout(req.params.id, req.body);
    if (!workout) {
      res.status(404).json({ success: false, error: 'Workout not found' });
      return;
    }
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await workoutService.deleteWorkout(req.params.id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Workout not found' });
      return;
    }
    res.json({ success: true, message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET workouts by date range
router.get('/user/:userId/range', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ success: false, error: 'startDate and endDate are required' });
      return;
    }
    const workouts = await workoutService.getWorkoutsByDateRange(
      req.params.userId,
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
