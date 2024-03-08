import { Router } from "express";
import ColumnsRouter from "./columnsRouter";
import CardsRouter from "./cardsRouter";
const router = Router();

router.use("/columns", ColumnsRouter);
router.use("/cards", CardsRouter);

export default router;
