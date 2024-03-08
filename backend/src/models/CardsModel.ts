import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface CardsInterface extends Document {
  id: string;
  title: string;
  description: string;
  list: string;
  date: string;
}

const cardsSchema = new Schema<CardsInterface>(
  {
    id: {
      unique: true,
      default: uuidv4,
      type: String,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    list: String,
    date: String,
  },
  { versionKey: false }
);

export const Cards = mongoose.model<CardsInterface>("Cards", cardsSchema);
