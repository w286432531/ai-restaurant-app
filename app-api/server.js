import express from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const local = process.env.NODE_ENV === "development";

const app = express();
const PORT = 5000;

const prisma = new PrismaClient();
await prisma.$connect().then(() => {
  console.log('Prisma Connection Successful')
}).catch((error) => {
  console.log('Prisma Connection Failed')
  console.log(error)
})

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/category", categoryRoutes(prisma));
app.use("/api/item", itemRoutes(prisma));
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
