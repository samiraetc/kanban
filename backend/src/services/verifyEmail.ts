import { Request, Response, NextFunction } from "express";
import { Users } from "../models/UsersModel";
const verifyEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const existUser = await Users.find({ email: request.body.email });

  if (existUser) {
    response.status(422).json({
      error: {
        email: "Já existe um usuário com esse email",
      },
    });
  }

  next();
};

export default verifyEmail;
