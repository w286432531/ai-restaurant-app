import express from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
const app = express();
const local = process.env.NODE_ENV === "development";
const PORT = 5000;
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);

