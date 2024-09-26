// controllers/originalsController.js
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

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

// Obtenir tous les originaux
export const getAllOriginals = async (req, res) => {
  try {
    const items = await prisma.originals.findMany();

    console.log(items);
    res.json(items);
  } catch (error) {
    console.error("Erreur lors de la récupération des originaux :", error);
    res.status(500).send("Une erreur est survenue.");
  }
};

// Ajouter un nouvel original
export const addOriginal = async (req, res) => {
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
};
