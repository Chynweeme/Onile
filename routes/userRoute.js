import express from "express"
import { signup, loginUser, getAllUsers, getUser, deleteUser, updateUser } from "../controller/userController.js";


const router = express.Router();


router.post('/signup', signup)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router;
