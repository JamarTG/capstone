import { Schema, model, Document, Types } from 'mongoose';
import { IQuestion } from '../types/model';

export interface IQuiz extends Document {
  topic: Types.ObjectId;
  user: Types.ObjectId;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
  questions: IQuestion[];
}

const QuizSchema = new Schema<IQuiz>(
  {
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic reference is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
      min: 0
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    completed: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }],
    questions: [{
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Question reference is required']
      },
      selectedOption: {
        type: String,
        // required: [true, 'Selected option is required'],
        uppercase: true,
        trim: true
      },
      isCorrect: {
        type: Boolean,
        // required: [true, 'Correctness flag is required']
      },
      answeredAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true
  }
);

QuizSchema.index({ user: 1 });
QuizSchema.index({ topic: 1 });
QuizSchema.index({ completed: 1 });
QuizSchema.index({ score: 1 });

export const Quiz = model<IQuiz>('Quiz', QuizSchema);