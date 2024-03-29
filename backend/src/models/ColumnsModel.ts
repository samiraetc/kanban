import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ColumnsInterface extends Document {
  id: string;
  title: string;
  key: string;
}

const columnsSchema = new Schema<ColumnsInterface>(
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
    key: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

export const Columns = mongoose.model<ColumnsInterface>(
  "Columns",
  columnsSchema
);
