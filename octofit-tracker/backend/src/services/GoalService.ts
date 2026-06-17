import Goal, { IGoal } from '../models/Goal';
import mongoose from 'mongoose';

export class GoalService {
  async createGoal(goalData: Partial<IGoal>): Promise<IGoal> {
    const goal = new Goal(goalData);
    return await goal.save();
  }

  async getGoalById(id: string): Promise<IGoal | null> {
    return await Goal.findById(id).populate('userId');
  }

  async getGoalsByUserId(userId: string): Promise<IGoal[]> {
    return await Goal.find({ userId: new mongoose.Types.ObjectId(userId) }).populate('userId');
  }

  async updateGoal(id: string, updateData: Partial<IGoal>): Promise<IGoal | null> {
    return await Goal.findByIdAndUpdate(id, updateData, { new: true }).populate('userId');
  }

  async deleteGoal(id: string): Promise<boolean> {
    const result = await Goal.findByIdAndDelete(id);
    return result !== null;
  }

  async completeGoal(id: string): Promise<IGoal | null> {
    return await Goal.findByIdAndUpdate(id, { completed: true }, { new: true }).populate('userId');
  }

  async getActiveGoalsByUserId(userId: string): Promise<IGoal[]> {
    return await Goal.find({
      userId: new mongoose.Types.ObjectId(userId),
      completed: false,
    }).populate('userId');
  }
}
