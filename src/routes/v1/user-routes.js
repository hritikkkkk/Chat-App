import express from "express";
import { userSignIn } from "../../controllers/user.js";

const router = express.Router();

router.post("/signIn", userSignIn);

export default router;
