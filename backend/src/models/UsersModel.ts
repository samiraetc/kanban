import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const usersSchema = new Schema(
  {
    id: {
      unique: true,
      default: uuidv4,
      type: String,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  { versionKey: false }
);

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const Users = mongoose.model<Document>("Users", usersSchema);
