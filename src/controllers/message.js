import { StatusCodes } from "http-status-codes";

import { ErrorResponse } from "../utils/common/error-response.js";
import { SuccessResponse } from "../utils/common/success-response.js";
import { CreateMessage, getMessages } from "../services/message-service.js";

export const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const response = await CreateMessage({
      senderId,
      receiverId,
      content,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export const getMessage = async (req, res) => {
  try {
      const { senderId, receiverId } = req.params;
    const response = await getMessages({
      senderId,
      receiverId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
