import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { users } from "../drizzle/schema.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

export const UserSignIn = async (data) => {
  try {
    const { username, password, email } = data;

    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.insert(users).values({
        username: username,
        email: email,
        password: hashedPassword,
      });

      user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    } else {
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        throw new AppError("Invalid Password", StatusCodes.UNAUTHORIZED);
      }
    }

    const token = sign({ id: user[0].id }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
