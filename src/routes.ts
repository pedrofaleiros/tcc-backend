import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const userController = new UserController()

const router = Router()

router.post('/user', userController.createUser)
router.post('/auth', userController.authUser)
// router.get("/users", isAuthenticated, userController.listAllUsers)

router.get('/', (req, res) => {
	res.json({ status: "Ok" })
})

export { router }