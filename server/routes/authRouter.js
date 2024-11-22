import express from "express";
import { home, login, register,user } from "../controller/authController.js";
import { loginSchema, signupSchema } from "../validators/auth-validators.js";
import { validate } from "../middleware/validate-middleware.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
const router = express.Router()

router.get("/",home)

router.post("/register",validate(signupSchema),register)
router.post("/login",validate(loginSchema) ,login)
router.get("/user",authMiddleware,user)

export default router