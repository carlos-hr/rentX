import express from "express";
import { routes as categoriesRoutes } from "./routes/categories";

const app = express();

app.use(express.json());
app.use("/categories", categoriesRoutes);
app.get("/", (req, res) => {
  return res.json({ message: "tamo aqui carai" });
});

app.post("/", (req, res) => {
  const { name } = req.body;
  return res.json({ name });
});

app.listen(3333, () => console.log("Server is running!"));
