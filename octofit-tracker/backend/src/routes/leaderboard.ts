import { Router, Request, Response } from 'express';

const router = Router();

// Get leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard' });
});

// Get leaderboard by team
router.get('/team/:teamId', (req: Request, res: Response) => {
  res.json({ message: `Get leaderboard for team ${req.params.teamId}` });
});

// Get user ranking
router.get('/user/:userId', (req: Request, res: Response) => {
  res.json({ message: `Get ranking for user ${req.params.userId}` });
});

export default router;
