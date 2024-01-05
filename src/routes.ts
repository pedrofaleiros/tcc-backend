import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { QuestionController } from "./controllers/QuestionController";
import { AnswerQuestionController } from "./controllers/AnswerQuestionController";
import { CategoryController } from "./controllers/CategoryController";

const userController = new UserController()
const questionController = new QuestionController()
const answerQuestionController = new AnswerQuestionController()
const categoryController = new CategoryController()

const router = Router()

router.post('/user', userController.createUser)
router.post('/auth', userController.authUser)

router.post('/question', isAuthenticated, questionController.createQuestion)
router.get('/questions', isAuthenticated, questionController.listQuestionsByLevel)
router.get('/questions/category', isAuthenticated, questionController.listQuestionsByCategory)
router.delete('/question', isAuthenticated, questionController.deleteQuestion)

router.post('/answerQuestion', isAuthenticated, answerQuestionController.answerQuestion)
router.get('/answeredQuestions', isAuthenticated, answerQuestionController.getUserAnsweredQuestions)

router.post('/category', isAuthenticated, categoryController.create)
router.get('/category', isAuthenticated, categoryController.list)
router.delete('/category', isAuthenticated, categoryController.delete)

router.get('/', (req, res) => res.json({ status: "Ok" }))

export { router }