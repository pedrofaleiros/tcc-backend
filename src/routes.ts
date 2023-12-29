import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { QuestionController } from "./controllers/QuestionController";
import { AnswerQuestionController } from "./controllers/AnswerQuestionController";

const userController = new UserController()
const questionController = new QuestionController()
const answerQuestionController = new AnswerQuestionController()

const router = Router()

router.post('/user', userController.createUser)
router.post('/auth', userController.authUser)

router.post('/question', isAuthenticated, questionController.createQuestion)
router.get('/questions', isAuthenticated, questionController.listQuestionsByLevel)

router.post('/answerQuestion', isAuthenticated, answerQuestionController.answerQuestion)
router.get('/answeredQuestions', isAuthenticated, answerQuestionController.getUserAnsweredQuestions)

router.get('/', (req, res) => res.json({ status: "Ok" }))

export { router }