import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import Joi from "joi"; // Pour la validation des données

const router = Router();
const prisma = new PrismaClient();

// Schéma de validation pour les données des originaux
const originalSchema = Joi.object({
  category: Joi.string().required(),
  title: Joi.string().required(),
  serie: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),
  piece: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),

  dimension: Joi.string().required(),
  date: Joi.string().required(),
  format: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),
  price: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),
  papier: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),

  imageUrls: Joi.array().items(Joi.string()).optional().default([]),
  stock: Joi.string()
    .required()
    .when("category", { is: "originaux", then: Joi.optional() }),
});

// Route pour obtenir tous les originaux
router.get("/", async (req, res) => {
  try {
    const items = await prisma.originals.findMany();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue.");
  }
});

//Route pour obtenir gallery data
router.get("/gallery", async (req, res) => {
  try {
    const items = await prisma.gallery.findMany();
    res.json(items);

    console.log(items);
  } catch (error) {
    res.status(500).send("Une erreur est survenue.");
  }
});

// Route pour mettre à jour le stock d'un original
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).send("Quantité invalide.");
    }

    const original = await prisma.originals.findUnique({
      where: { id: id },
    });

    if (original && original.stock >= quantity) {
      const newStock = original.stock - quantity;
      const updatedOriginal = await prisma.originals.update({
        where: { id: id },
        data: { stock: newStock.toString() },
      });
      res.json(updatedOriginal);
    } else {
      res.status(400).send("Pas assez de stock ou article non trouvé.");
    }
  } catch (error) {
    res.status(500).send("Une erreur est survenue.");
  }
});

// Route pour ajouter un nouvel original
router.post("/", async (req, res) => {
  const { error, value } = originalSchema.validate(req.body);

  if (error) {
    return res.status(400).send(`Données invalides : ${error.message}`);
  }

  const {
    category,
    title,
    serie,
    piece,
    dimension,
    date,
    format,
    price,
    papier,
    imageUrls,
    stock,
  } = value;

  try {
    const newOriginal = await prisma.originals.create({
      data: {
        category,
        title,
        serie,
        piece,
        dimension,
        date,
        format,
        price,
        papier,
        imageUrls,
        stock,
      },
    });
    res.status(201).json(newOriginal);
  } catch (error) {
    res.status(500).send("Une erreur est survenue.");
  }
});

//Route pour mettre à jour un original

router.put("/update-stock/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const original = await prisma.originals.findUnique({
      where: { id: id },
    });

    if (!original) {
      return res.status(404).send("Original non trouvé.");
    }

    const { error, value } = originalSchema.validate(req.body);

    if (error) {
      return res.status(400).send(`Données invalides : ${error.message}`);
    }

    let data = { ...value };

    const {
      category,
      title,
      serie,
      piece,
      dimension,
      date,
      format,
      price,
      papier,
      imageUrls,
      stock,
    } = value;

    if (typeof data.price === "number") {
      data.price = data.price.toString();
    }

    const updatedOriginal = await prisma.originals.update({
      where: { id: id },
      data: {
        category,
        title,
        serie,
        piece,
        dimension,
        date,
        format,
        price,
        papier,
        imageUrls,
        stock,
      },
    });
    res.json(updatedOriginal);
  } catch (error) {
    res.status(500).send("Une erreur est survenue.");
  }
});

export default router;
