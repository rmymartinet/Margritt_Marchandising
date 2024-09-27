// routes/originals.js
import { Router } from "express";
import {
  addOriginal,
  getAllOriginals,
} from "../controllers/originalsController.js";

const router = Router();

// Route pour obtenir tous les originaux
router.get("/", getAllOriginals);

// Route pour ajouter un original
router.post("/", addOriginal);

export default router;
