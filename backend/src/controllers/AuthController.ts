import { Request, Response } from "express";
import { loginService } from "../services/authService";

export const AuthController = {
  login: async (request: Request, response: Response) => {
    try {
      const token = await loginService(
        request.body.email,
        request.body.password
      );
      try {
      } catch {
        response.status(500).json({ msg: "Internal server error" });
      }

      response.json(token);
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
};
