import express from "express";
import { Login, Register } from "../controllers/user.js";


const router  = express.Router();

router.post("/login", Login)
router.post("/register", Register)


export const userRouter = router;