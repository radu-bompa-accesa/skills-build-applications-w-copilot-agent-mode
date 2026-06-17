import Workout, { IWorkout } from '../models/Workout';
import mongoose from 'mongoose';

export class WorkoutService {
  async createWorkout(workoutData: Partial<IWorkout>): Promise<IWorkout> {
    const workout = new Workout(workoutData);
    return await workout.save();
  }

  async getWorkoutById(id: string): Promise<IWorkout | null> {
    return await Workout.findById(id).populate('userId');
  }

  async getWorkoutsByUserId(userId: string): Promise<IWorkout[]> {
    return await Workout.find({ userId: new mongoose.Types.ObjectId(userId) }).populate('userId');
  }

  async updateWorkout(id: string, updateData: Partial<IWorkout>): Promise<IWorkout | null> {
    return await Workout.findByIdAndUpdate(id, updateData, { new: true }).populate('userId');
  }

  async deleteWorkout(id: string): Promise<boolean> {
    const result = await Workout.findByIdAndDelete(id);
    return result !== null;
  }

  async getWorkoutsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<IWorkout[]> {
    return await Workout.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: startDate, $lte: endDate },
    }).populate('userId');
  }
}
