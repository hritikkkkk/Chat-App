import express from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import messageRoutes from "./message-routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

router.use("/message", messageRoutes);

export default router;
