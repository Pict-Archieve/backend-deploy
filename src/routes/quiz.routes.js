import { Router } from "express"
import cors from "cors"
import corsOptionForCredentials from "../config/cors.js"
import isUserAuth from "../middleware/isUserAuth.js"
import quizController from "../controller/quiz.controller.js"
import isAdminAuth from "../middleware/isAdminAuth.js"
const router = Router()

router.options("", cors(corsOptionForCredentials))
router.get(
  "",
  cors(corsOptionForCredentials),
  isUserAuth,
  quizController.getQuizQuestion
)

router.options("/streak", cors())
router.get("/streak", cors(), quizController.getStreak)

router.options("", cors(corsOptionForCredentials))
router.post(
  "",
  cors(corsOptionForCredentials),
  isAdminAuth,
  quizController.createQuestion
)

router.options("/submit", cors(corsOptionForCredentials))
router.post(
  "/submit",
  cors(corsOptionForCredentials),
  isUserAuth,
  quizController.submitQuiz
)

export default router
