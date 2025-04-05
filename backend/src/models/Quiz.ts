import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  currentQuestionIndex: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Quiz', quizSchema);
