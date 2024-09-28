import mongoose, { Schema } from "mongoose"

const quizHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  correctAnswerCount: { type: Number, required: true },
  totalQuestionsCount: { type: Number, required: true },
  quizSubmitDate: { type: Date, default: Date.now },
  topic: { type: String, required: true }
})

export default mongoose.model("QuizHistory", quizHistorySchema)
