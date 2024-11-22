import express from "express";
import { getAllContacts, getAllUsers , deleteUserById, getUserById, updateUserById, deleteContactById} from "../controller/adminController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
const router = express.Router()

router.get("/users",authMiddleware,adminMiddleware, getAllUsers)
router.delete("/users/delete/:id",authMiddleware,adminMiddleware,deleteUserById)
router.get("/users/:id",authMiddleware,adminMiddleware,getUserById)
router.patch("/users/update/:id",authMiddleware,adminMiddleware,updateUserById)
router.get("/contacts",authMiddleware, adminMiddleware,getAllContacts)
router.delete("/contacts/delete/:id",authMiddleware,adminMiddleware,deleteContactById)

 




export default router