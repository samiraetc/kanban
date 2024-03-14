import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Users } from "../models/UsersModel";

interface DecodedToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET as Secret
    ) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getUserById(userId: string): Promise<any | null> {
  try {
    const user = await Users.findOne({ id: userId }).select("+password");
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserByAuthorization(tokenAuthorization: string) {
  const parts = tokenAuthorization.split(" ");
  const [scheme, token] = parts;
  const decodedToken = await verifyToken(token);
  if (!decodedToken) return { message: "Invalid token!" };
  const user = await getUserById(decodedToken.id);

  return user.id;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ message: "The token was not informed!" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return res.status(401).send({ message: "Invalid token!" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "Malformatted Token!" });

  const decodedToken = await verifyToken(token);

  if (!decodedToken) return res.status(401).send({ message: "Invalid token!" });

  const user = await getUserById(decodedToken.id);

  if (!user) return res.status(401).send({ message: "Invalid token!" });

  req.userId = user.id;

  next();
}
