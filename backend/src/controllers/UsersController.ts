import { Request, Response } from "express";
import { Users } from "../models/UsersModel";
import { v4 as uuidv4 } from "uuid";

export const UsersController = {
  register: async (request: Request, response: Response) => {
    try {
      const { first_name, last_name, email, password } = request.body;

      if (!first_name || !last_name || !email || !password) {
        response.status(422).json({
          error: "Campos invalidos",
        });
      }

      const user = {
        id: uuidv4(),
        first_name,
        last_name,
        email,
        password,
      };

      await Users.create(user);

      response.status(201).json({ user: await Users.find() });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },

  getUser: async (request: Request, response: Response) => {
    try {
      const user = await Users.findOne({ id: request.params.id });
      response.json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
};
