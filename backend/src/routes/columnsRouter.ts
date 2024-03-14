import { Router } from "express";
import { ColumnsController } from "../controllers/ColumnsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", ColumnsController.getAllColumns);
router.post("/", ColumnsController.addColumn);
router.delete("/:id", ColumnsController.deleteColumn);
router.get("/:id", ColumnsController.getColumn);

export default router;
