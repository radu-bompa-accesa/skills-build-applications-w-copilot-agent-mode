import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Configure CORS for Codespaces and localhost
const getCorsOrigin = (): string => {
  // Support Codespaces environment: https://$CODESPACE_NAME-8000.app.github.dev
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

// Middleware
app.use(cors({
  origin: getCorsOrigin(),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDatabase();
    const corsOrigin = getCorsOrigin();
    console.log(`CORS enabled for: ${corsOrigin}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
