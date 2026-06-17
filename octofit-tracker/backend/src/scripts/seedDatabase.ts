import mongoose from 'mongoose';
import User from '../models/User';
import Workout from '../models/Workout';
import Goal from '../models/Goal';

const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Goal.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        username: 'octofit_user1',
        email: 'octouser1@example.com',
        password: 'SecurePass123!',
      },
      {
        username: 'octofit_user2',
        email: 'octouser2@example.com',
        password: 'SecurePass456!',
      },
      {
        username: 'octofit_user3',
        email: 'octouser3@example.com',
        password: 'SecurePass789!',
      },
    ]);
    console.log('👥 Created 3 sample users');

    // Create sample workouts
    const workouts = await Workout.create([
      {
        userId: users[0]._id,
        name: 'Morning Cardio Session',
        description: 'High-intensity interval training',
        duration: 45,
        caloriesBurned: 520,
        exercises: [
          { name: 'Treadmill', sets: 1, reps: 20, weight: 0 },
          { name: 'Jump Rope', sets: 3, reps: 50, weight: 0 },
          { name: 'Burpees', sets: 3, reps: 15, weight: 0 },
        ],
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: users[0]._id,
        name: 'Strength Training',
        description: 'Full body weight lifting',
        duration: 60,
        caloriesBurned: 450,
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Squats', sets: 4, reps: 10, weight: 225 },
          { name: 'Deadlifts', sets: 3, reps: 5, weight: 315 },
        ],
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: users[1]._id,
        name: 'Yoga Session',
        description: 'Relaxing yoga and stretching',
        duration: 50,
        caloriesBurned: 200,
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1, weight: 0 },
          { name: 'Downward Dog', sets: 3, reps: 10, weight: 0 },
          { name: 'Warrior Pose', sets: 3, reps: 8, weight: 0 },
        ],
        date: new Date(),
      },
      {
        userId: users[1]._id,
        name: 'Running',
        description: 'Evening jog through the park',
        duration: 35,
        caloriesBurned: 380,
        exercises: [
          { name: 'Running', sets: 1, reps: 35, weight: 0 },
        ],
        date: new Date(),
      },
      {
        userId: users[2]._id,
        name: 'Swimming',
        description: 'Lap swimming for cardio',
        duration: 55,
        caloriesBurned: 550,
        exercises: [
          { name: 'Front Crawl', sets: 20, reps: 1, weight: 0 },
          { name: 'Backstroke', sets: 10, reps: 1, weight: 0 },
          { name: 'Butterfly', sets: 5, reps: 1, weight: 0 },
        ],
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ]);
    console.log('🏋️  Created 5 sample workouts');

    // Create sample goals
    const goals = await Goal.create([
      {
        userId: users[0]._id,
        title: 'Run a 5K',
        description: 'Complete a 5-kilometer run in under 25 minutes',
        targetValue: 5,
        currentValue: 3.2,
        unit: 'km',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        completed: false,
      },
      {
        userId: users[0]._id,
        title: 'Lose 10 pounds',
        description: 'Reduce body weight by 10 pounds through diet and exercise',
        targetValue: 10,
        currentValue: 4,
        unit: 'lbs',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        completed: false,
      },
      {
        userId: users[1]._id,
        title: 'Build Core Strength',
        description: 'Perform 50 consecutive push-ups',
        targetValue: 50,
        currentValue: 30,
        unit: 'push-ups',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        completed: false,
      },
      {
        userId: users[1]._id,
        title: 'Flexibility Challenge',
        description: 'Touch toes without bending knees',
        targetValue: 1,
        currentValue: 1,
        unit: 'achievement',
        deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        completed: true,
      },
      {
        userId: users[2]._id,
        title: 'Swim 1 Mile',
        description: 'Complete a 1-mile swim without stopping',
        targetValue: 1,
        currentValue: 0.6,
        unit: 'miles',
        deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), // 50 days from now
        completed: false,
      },
      {
        userId: users[2]._id,
        title: 'Daily Workouts',
        description: 'Complete a workout every day for 30 days',
        targetValue: 30,
        currentValue: 12,
        unit: 'days',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        completed: false,
      },
    ]);
    console.log('🎯 Created 6 sample goals');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Workouts: ${workouts.length}`);
    console.log(`  - Goals: ${goals.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
