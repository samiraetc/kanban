import { Router } from "express";
import { ColumnsController } from "../controllers/ColumnsController";

const router = Router();
router.get("/", ColumnsController.getAllColumns);
router.post("/", ColumnsController.addColumn);
router.delete("/:id", ColumnsController.deleteColumn);
router.get("/:id", ColumnsController.getColumn);

export default router;
