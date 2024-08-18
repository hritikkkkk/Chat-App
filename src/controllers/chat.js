import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/error-response.js";
import { SuccessResponse } from "../utils/common/success-response.js";
import { Chat, CreateChat, FindUserChat } from "../services/chat-service.js";

export const createChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    const response = await CreateChat({
      userId1,
      userId2,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export const findUserChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await FindUserChat({
      userId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export const findChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const response = await Chat({
      userId1,
      userId2,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
