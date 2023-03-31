import express from "express";
import dotenv from "dotenv";
dotenv.config();
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import { userRoutes, loggedInUserRoutes } from "./routes/userRoutes.js";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import passportConfig from "./passportConfig.js/passportConfig.js";

const local = process.env.NODE_ENV === "development";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();
await prisma.$connect().then(() => {
  console.log('Prisma Connection Successful')
}).catch((error) => {
  console.log('Prisma Connection Failed')
  console.log(error)
})
const secret = process.env.JWT_SECRET;
passportConfig(passport, prisma, secret);
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/category", categoryRoutes(prisma));
app.use("/api/item", itemRoutes(prisma));

app.use("/api/user", userRoutes(prisma, secret));

app.use(
  "/api/loggedInUser",
  passport.authenticate("jwt", { session: false }),
  loggedInUserRoutes(prisma)
);
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);