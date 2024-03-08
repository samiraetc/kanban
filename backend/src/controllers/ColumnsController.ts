import { Request, Response } from "express";
import { Columns } from "../models/ColumnsModel";
import { v4 as uuidv4 } from "uuid";

export const ColumnsController = {
  addColumn: async (request: Request, response: Response) => {
    try {
      const column = {
        id: uuidv4(),
        title: request.body.title,
        key: request.body.title.toLowerCase().replace(/\s/g, "_"),
      };

      const columns = await Columns.create(column);

      response.status(201).json({ columns });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  getAllColumns: async (request: Request, response: Response) => {
    try {
      const column = await Columns.find();
      response.json({ column });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  getColumn: async (request: Request, response: Response) => {
    try {
      const column = await Columns.findOne({ id: request.params.id });
      response.json({ column: column });
    } catch (error) {
      console.error(error);
      response.status(500).json({ msg: "Internal server error" });
    }
  },
  deleteColumn: async (request: Request, response: Response) => {
    try {
      const column = await Columns.find({ id: request.params.id });

      if (column) {
        await Columns.deleteOne({ id: request.params.id })
          .then(() => {
            return response.status(200).json();
          })
          .catch((err) => {
            return response
              .status(422)
              .json({ error: "Erro ao deletar o item" });
          });
      } else {
        return response.status(404).json({ error: "Item não encontradao" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Internal server error" });
    }
  },
};
