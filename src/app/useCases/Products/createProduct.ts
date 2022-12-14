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
//   "name": "PĂŁo",
//   "icon": "đ"
// },
// {
//   "name": "Carne",
//   "icon": "đ"
// },
// {
//   "name": "Bacon",
//   "icon": "đ„"
// },
// {
//   "name": "Molho Especial",
//   "icon": "đ«"
// },
// {
//   "name": "Alface",
//   "icon": "đ„Ź"
// },
// {
//   "name": "Tomate",
//   "icon": "đ"
// }
// ]
