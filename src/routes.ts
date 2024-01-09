import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { SubjectController } from "./controllers/SubjectController";
import { QuestionController } from "./controllers/QuestionController";
import { AnswerController } from "./controllers/AnswerController";

const userController = new UserController()
const subjectController = new SubjectController()
const questionController = new QuestionController()
const answerController = new AnswerController()

const router = Router()

router.post('/user', userController.createUser)
router.post('/auth', userController.authUser)

// get/search subjects
router.get('/subject', isAuthenticated, subjectController.listSubjects)
// list questions, subjectId?, level?
router.get('/questions', isAuthenticated, questionController.listQuestions)

router.get('/question', isAuthenticated) // get one question details X

// answer a question
router.post('/answer', isAuthenticated, answerController.answerQuestion)

//DEV --------------------------------------------------------
// create subject
router.post('/subject', isAuthenticated, subjectController.createSubject)
// delete subject
router.delete('/subject', isAuthenticated, subjectController.deleteSubject)

// create question
router.post('/question', isAuthenticated, questionController.createQuestion)
// delete question
router.delete('/question', isAuthenticated, questionController.deleteQuestion)

router.post('/question/subject', isAuthenticated) // add question to subject X
router.delete('/question/subject', isAuthenticated) // delete question subject X
//DEV --------------------------------------------------------

router.get('/', (_, res) => res.json({ status: "Ok" }))

export { router }