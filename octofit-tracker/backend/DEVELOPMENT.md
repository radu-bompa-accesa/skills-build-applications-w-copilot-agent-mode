# OctoFit Tracker - Database & Development Guide

## Quick Start

### 1. Install Dependencies
```bash
cd octofit-tracker/backend
npm install
```

### 2. Start MongoDB
Ensure MongoDB is running on `mongodb://localhost:27017`
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Seed the Database
Populate the database with sample data:
```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
👥 Created 3 sample users
🏋️  Created 5 sample workouts
🎯 Created 6 sample goals

✨ Database seeding completed successfully!
📊 Summary:
  - Users: 3
  - Workouts: 5
  - Goals: 6
```

### 4. Start the Backend Server
```bash
npm run dev
```

Expected output:
```
✅ Connected to MongoDB
🚀 Server is running on http://localhost:8000
```

### 5. Test the API (in another terminal)
```bash
npm run test:api
```

Expected output:
```
🧪 Testing OctoFit Tracker API...

1️⃣  Testing Health Endpoint
✅ Health Check: { status: 'OK', message: 'OctoFit Tracker Backend is running' }

2️⃣  Testing Get All Users
✅ Retrieved 3 users

3️⃣  Testing Get Workouts by User
✅ Retrieved 2 workouts for user

4️⃣  Testing Get Goals by User
✅ Retrieved 2 goals for user

5️⃣  Testing Get Active Goals
✅ Retrieved 1 active goals

✨ All API tests passed!
```

## Database Schema

### User Model
```typescript
interface IUser {
  username: string;      // Unique, 3+ chars
  email: string;         // Unique, valid email format
  password: string;      // 6+ chars
  createdAt: Date;
  updatedAt: Date;
}
```

### Workout Model
```typescript
interface IWorkout {
  userId: ObjectId;      // Reference to User
  name: string;          // E.g., "Morning Cardio"
  description: string;   // Workout details
  duration: number;      // In minutes
  caloriesBurned: number;// Total calories
  exercises: Array<{     // Array of exercises
    name: string;
    sets: number;
    reps: number;
    weight?: number;     // Optional, in lbs
  }>;
  date: Date;           // When workout occurred
  createdAt: Date;
  updatedAt: Date;
}
```

### Goal Model
```typescript
interface IGoal {
  userId: ObjectId;      // Reference to User
  title: string;         // E.g., "Run a 5K"
  description: string;   // Goal details
  targetValue: number;   // Target amount
  currentValue: number;  // Current progress
  unit: string;          // E.g., "km", "lbs", "days"
  deadline: Date;        // Target completion date
  completed: boolean;    // Achievement status
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Workouts
- `GET /api/workouts/user/:userId` - Get all workouts for user
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/user/:userId/range` - Get workouts by date range

### Goals
- `GET /api/goals/user/:userId` - Get all goals for user
- `GET /api/goals/:id` - Get goal by ID
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `PATCH /api/goals/:id/complete` - Mark goal as complete
- `GET /api/goals/user/:userId/active` - Get active (incomplete) goals

## Sample Data

The seed script creates:
- **3 Users**: octofit_user1, octofit_user2, octofit_user3
- **5 Workouts**: Various exercises with cardio, strength, yoga, running, and swimming
- **6 Goals**: Mix of completed and active goals with different metrics

## Development Tips

1. **View MongoDB Data**
   ```bash
   mongosh  # or mongo
   use octofit-tracker
   db.users.find()
   db.workouts.find()
   db.goals.find()
   ```

2. **Reset Database**
   ```bash
   npm run seed  # Clears and repopulates
   ```

3. **Manual API Testing**
   ```bash
   # Create a user
   curl -X POST http://localhost:8000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"Pass123!"}'
   ```

4. **Check MongoDB Connection**
   - Default: `mongodb://localhost:27017/octofit-tracker`
   - Ensure MongoDB service is running
   - Use `mongosh` or MongoDB Compass for GUI access

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running on port 27017
- **Port 8000 Already in Use**: Change PORT in `src/index.ts` or kill process on port 8000
- **TypeScript Errors**: Run `npm install` to ensure all types are installed
- **Seed Script Fails**: Check MongoDB connection and ensure database is accessible
