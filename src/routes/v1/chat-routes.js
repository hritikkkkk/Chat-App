import express from "express";
import { createChat, findChat, findUserChat } from "../../controllers/chat.js";

const router = express.Router();

router.post("/", createChat);

router.get("/:userId", findUserChat);

router.get("/find/:userId1/:userId2", findChat);

export default router;
