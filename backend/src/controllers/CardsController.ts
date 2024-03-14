import { Request, Response } from "express";
import { Cards } from "../models/CardsModel";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../models/UsersModel";
import { getUserByAuthorization } from "../middleware/authMiddleware";

export const CardsController = {
  addCard: async (request: Request, response: Response) => {
    try {
      const userId = await getUserByAuthorization(
        request.headers.authorization ?? ""
      );

      const cards = {
        id: uuidv4(),
        title: request.body.title,
        description: request.body.description,
        list: request.body.list,
        date: request.body.date,
        user_id: userId,
      };

      await Cards.create(cards);

      response.status(201).json(cards);
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  updateCard: async (request: Request, response: Response) => {
    try {
      const { title, description, list, date } = request.body;

      const updatedCard = await Cards.findOneAndUpdate(
        { id: request.params.id },
        { title, description, list, date },
        { new: true }
      );

      if (!updatedCard) {
        return response.status(404).json({ msg: "Item não encontrado" });
      }

      response.status(201).json({ card: await Cards.find() });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  getAllCards: async (request: Request, response: Response) => {
    try {
      const userId = await getUserByAuthorization(
        request.headers.authorization ?? ""
      );

      console.log("userid", userId);
      const cards = await Cards.find({
        user_id: userId,
      });

      console.log(cards);
      response.json({ cards });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  getCard: async (request: Request, response: Response) => {
    try {
      const card = await Cards.findOne({ id: request.params.id });
      response.json({ card });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  deleteCard: async (request: Request, response: Response) => {
    try {
      const card = await Cards.find({ id: request.params.id });

      if (card) {
        await Cards.deleteOne({ id: request.params.id });
        return response.status(201).json({ card: await Cards.find() });
      } else {
        return response.status(404).json({ error: "Item não encontradao" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Internal server error" });
    }
  },
};
