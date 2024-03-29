import { Router } from "express";
import { CardsController } from "../controllers/CardsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", CardsController.getAllCards);
router.post("/", CardsController.addCard);
router.put("/:id", CardsController.updateCard);
router.delete("/:id", CardsController.deleteCard);
router.get("/:id", CardsController.getCard);

export default router;
