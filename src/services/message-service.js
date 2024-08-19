import { messages } from "../drizzle/schema.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { db } from "../db/index.js";
import { inArray } from "drizzle-orm";

export const CreateMessage = async (data) => {
  try {
    const { senderId, receiverId, content } = data;

    if (!senderId || !receiverId || !content) {
      throw new AppError("All fields are required", StatusCodes.BAD_REQUEST);
    }

    const newMessage = await db
      .insert(messages)
      .values({ senderId, receiverId, content });

    return newMessage;
  } catch (error) {
    console.log(error);
    if (error.code === "23503") {
      throw new AppError(
        "Please SignIn to send messages",
        StatusCodes.UNAUTHORIZED
      );
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const getMessages = async (data) => {
  try {
    const { senderId, receiverId } = data;

    if (!senderId || !receiverId) {
      throw new AppError(
        "Sender and Receiver IDs are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const fetchedMessages = await db
      .select()
      .from(messages)
      .where(inArray(messages.id, [senderId, receiverId]));

    return fetchedMessages;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
