import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (erro) {
    res.sendStatus(500);
    console.log("erro", erro);
  }
}
// [
// {
//   "name": "Pão",
//   "icon": "🍞"
// },
// {
//   "name": "Carne",
//   "icon": "🍖"
// },
// {
//   "name": "Bacon",
//   "icon": "🥓"
// },
// {
//   "name": "Molho Especial",
//   "icon": "🫕"
// },
// {
//   "name": "Alface",
//   "icon": "🥬"
// },
// {
//   "name": "Tomate",
//   "icon": "🍅"
// }
// ]
