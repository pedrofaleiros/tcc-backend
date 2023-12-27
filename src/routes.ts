import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { QuestionController } from "./controllers/QuestionController";

const userController = new UserController()
const questionController = new QuestionController()

const router = Router()

router.post('/user', userController.createUser)
router.post('/auth', userController.authUser)
// router.get("/users", isAuthenticated, userController.listAllUsers)

router.post('/question', isAuthenticated, questionController.createQuestion)
router.get('/questions', isAuthenticated, questionController.listQuestionsByLevel)

router.get('/', (req, res) => {
	res.json({ status: "Ok" })
})

export { router }