import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';

// Define schemas for seeding
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  points: Number,
});

const teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [String],
});

const activitySchema = new mongoose.Schema({
  name: String,
  type: String,
  calories: Number,
});

const workoutSchema = new mongoose.Schema({
  userId: String,
  activityId: String,
  duration: Number,
  date: Date,
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Workout = mongoose.model('Workout', workoutSchema);

/**
 * Seed test data in octofit_db database
 * 
 * Usage: npm run seed
 * Description: Initializes the octofit_db database with sample test data including users, teams, activities, and workouts
 */
const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});

    // Seed users
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com', points: 1500 },
      { name: 'Bob Smith', email: 'bob@example.com', points: 1200 },
      { name: 'Charlie Brown', email: 'charlie@example.com', points: 900 },
      { name: 'Diana Prince', email: 'diana@example.com', points: 1800 },
      { name: 'Eve Davis', email: 'eve@example.com', points: 1100 },
    ]);

    // Seed teams
    const teams = await Team.insertMany([
      { name: 'Fitness Warriors', description: 'Elite fitness team', members: [users[0]._id, users[1]._id] },
      { name: 'Health Enthusiasts', description: 'Community health team', members: [users[2]._id, users[3]._id, users[4]._id] },
    ]);

    // Seed activities
    const activities = await Activity.insertMany([
      { name: 'Running', type: 'Cardio', calories: 600 },
      { name: 'Cycling', type: 'Cardio', calories: 500 },
      { name: 'Weightlifting', type: 'Strength', calories: 400 },
      { name: 'Swimming', type: 'Cardio', calories: 700 },
      { name: 'Yoga', type: 'Flexibility', calories: 200 },
    ]);

    // Seed workouts
    await Workout.insertMany([
      { userId: users[0]._id, activityId: activities[0]._id, duration: 60, date: new Date('2026-06-15') },
      { userId: users[1]._id, activityId: activities[1]._id, duration: 45, date: new Date('2026-06-16') },
      { userId: users[2]._id, activityId: activities[2]._id, duration: 90, date: new Date('2026-06-17') },
      { userId: users[3]._id, activityId: activities[3]._id, duration: 30, date: new Date('2026-06-17') },
      { userId: users[4]._id, activityId: activities[4]._id, duration: 45, date: new Date('2026-06-16') },
    ]);

    console.log('Database seeding completed successfully!');
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await disconnectDatabase();
    process.exit(1);
  }
};

seedDatabase();
