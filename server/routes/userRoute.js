import { loginUser, registerUser } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);

export default router;
