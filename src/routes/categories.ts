import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Category } from "../model/Category";

const routes = Router();
const categories: Category[] = [];

routes.post("/", (req, res) => {
  const { name, description } = req.body;

  const category = new Category();
  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return res.status(201).send();
});

export { routes };
