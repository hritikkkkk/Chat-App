import { StatusCodes } from "http-status-codes";
import { UserSignIn } from "../services/user-service.js";
import { ErrorResponse } from "../utils/common/error-response.js";
import { SuccessResponse } from "../utils/common/success-response.js";

export const userSignIn = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const response = await UserSignIn({
      username,
      password,
      email,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};


