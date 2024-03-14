import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../models/UsersModel";

require("dotenv").config();

export function generateToken(id: string) {
  return jwt.sign({ id: id }, process.env.SECRET as Secret, {
    expiresIn: "30m",
  });
}

export const loginService = async (email: String, password: any) => {
  const user: any = await Users.findOne({ email }).select("+password");

  if (!user) return "Wrong password or username";

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return "Invalid password";

  const token = generateToken(user.id);

  return {
    id: user.id,
    fist_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    access_token: token,
  };
};
