import { Router } from "express";
import ColumnsRouter from "./columnsRouter";
const router = Router();

router.use("/columns", ColumnsRouter);

export default router;
