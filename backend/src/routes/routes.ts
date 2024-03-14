import { Router } from "express";
import ColumnsRouter from "./columnsRouter";
import CardsRouter from "./cardsRouter";
import UserRouter from "./userRouter";
import AuthRouter from "./authRouter";
const router = Router();

router.use("/columns", ColumnsRouter);
router.use("/cards", CardsRouter);
router.use("/users", UserRouter);
router.use("/login", AuthRouter);

export default router;
