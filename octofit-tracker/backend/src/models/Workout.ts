import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  duration: number; // in minutes
  caloriesBurned: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
