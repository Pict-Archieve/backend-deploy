import mongoose, { Schema } from "mongoose"

// quiz model stores the data about questions
const quizSchema = new Schema({
  question: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: Number, required: true },
  answer: { type: String, required: true },
  wrongOption1: { type: String, required: true },
  wrongOption2: { type: String, required: true },
  wrongOption3: { type: String, required: true },
  detailedSolution: { type: String, required: true }
})

export default mongoose.model("Quiz", quizSchema)
