import express from 'express'
import { contactForm } from '../controller/contactController.js'

const router =express.Router()

router.post("/contact",contactForm)
export default router