import express, { Request, Response } from "express";
import mongoose from "mongoose";
import router from "./src/routes/routes";
import cors from "cors";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_CONNECTION = process.env.MONGODB_URI || "mongodb://";

// Conectar ao MongoDB
mongoose.connect(DATABASE_CONNECTION);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
