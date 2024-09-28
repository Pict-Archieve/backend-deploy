import mongoose from "mongoose"
import { Types } from "mongoose"
import quizModel from "../models/quiz.model.js"
import quizHistoryModel from "../models/quizHistory.model.js"

const quizServices = {
  createQuizQuestion: question => {
    return quizModel.create(question)
  },

  getQuizQuestion: (topic, count) => {
    return quizModel.aggregate([
      { $match: { topic } },
      { $sample: { size: count } },
      { $project: { _id: 0, __v: 0 } }
    ])
  },

  submitQuiz: history => {
    return quizHistoryModel.create(history)
  },

  getQuizHistoryDates: async userId => {
    const id = new Types.ObjectId(userId)
    const data = await quizHistoryModel.aggregate([
      {
        $match: { userId: id }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y/%m/%d GMT",
              date: "$quizSubmitDate"
            }
          }
        }
      },
      {
        $group: {
          _id: "$date"
        }
      },
      {
        $sort: { _id: -1 }
      }
    ])

    return data.map(item => new Date(item._id))
  }
}

export default quizServices
