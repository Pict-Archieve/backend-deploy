import { Types } from 'mongoose';
/**
 * @typedef {Object} IQuiz
 * @property {string} question
 * @property {string} topic
 * @property {number} difficulty
 * @property {string} answer
 * @property {string} wrongOption1
 * @property {string} wrongOption2
 * @property {string} wrongOption3
 * @property {string} detailedSolution
 */

/**
 * @typedef {Object} IQuizHistory
 * @property {Types.ObjectId} userId
 * @property {number} correctAnswerCount
 * @property {number} totalQuestionsCount
 * @property {Date} quizSubmitDate
 * @property {string} topic
 */

/**
 * @typedef {Object} IQuizHistorySubmit
 * @property {Types.ObjectId} userId
 * @property {number} correctAnswerCount
 * @property {number} totalQuestionsCount
 * @property {string} topic
 */

