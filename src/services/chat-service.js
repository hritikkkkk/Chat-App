import { StatusCodes } from "http-status-codes";
import { db } from "../db/index.js";
import { chat, users } from "../drizzle/schema.js";
import AppError from "../utils/errors/app-error.js";
import { inArray, sql } from "drizzle-orm";

async function findChat(userId1, userId2) {
  const existingChat = await db
    .select()
    .from(chat)
    .where(sql`members @> ARRAY[${userId1}, ${userId2}]::text[]`)
    .limit(1);

  return existingChat.length > 0 ? existingChat[0] : null;
}

export const CreateChat = async (data) => {
  try {
    const { userId1, userId2 } = data;

    if (!userId1 || !userId2) {
      throw new AppError(
        "Both user IDs are required",
        StatusCodes.NOT_ACCEPTABLE
      );
    }

    const usersExist = await db
      .select()
      .from(users)
      .where(inArray(users.id, [userId1, userId2]));

    if (usersExist.length !== 2) {
      throw new AppError(
        "One or both users do not exist",
        StatusCodes.NOT_FOUND
      );
    }

    const existingChat = await findChat(userId1, userId2);
    if (existingChat) {
      return existingChat;
    }

    const newChat = {
      members: [userId1, userId2],
    };

    const result = await db.insert(chat).values(newChat).returning();

    return result[0];
  } catch (error) {
    console.error("Error handling chat request:", error);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const FindUserChat = async (data) => {
  try {
    const { userId } = data;

    if (!userId) {
      throw new AppError("User ID is required", StatusCodes.BAD_REQUEST);
    }

    const userChats = await db
      .select()
      .from(chat)
      .where(sql`${userId} = ANY(${chat.members})`);

    if (userChats.length === 0) {
      throw new AppError("No chats found for this user", StatusCodes.NOT_FOUND);
    }

    return userChats;
  } catch (error) {
    console.error("Error retrieving user chats:", error);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const Chat = async (data) => {
  try {
    const { userId1, userId2 } = data;

    if (!userId1 || !userId2) {
      throw new AppError(
        "Both user IDs are required",
        StatusCodes.NOT_ACCEPTABLE
      );
    }
    const chat = await findChat(userId1, userId2);
    return chat;
  } catch (error) {
    console.error("Error retrieving user chats:", error);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
