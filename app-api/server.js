import express from "express";
import dotenv from "dotenv";
dotenv.config();
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import { userRoutes, loggedInUserRoutes } from "./routes/userRoutes.js";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import passportConfig from "./passportConfig.js/passportConfig.js";
import cookieParser from "cookie-parser";


const local = process.env.NODE_ENV === "development";
console.log(local);
const app = express();
app.use(cookieParser());
//TODO update when push to production
const frontEndUrl = local ? "http://localhost:3000" : "production base url";
const PORT = local?5000: 'production port';
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
// if using cors
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
passportConfig(
  passport,
  prisma,
  secret,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/category", categoryRoutes(prisma));
app.use("/api/item",passport.authenticate("jwt", { session: false }), itemRoutes(prisma));
app.use("/api/order",passport.authenticate("jwt", { session: false }), orderRoutes(prisma));

app.use(
  "/api/user",
  userRoutes(prisma, secret, frontEndUrl, process.env.NODE_ENV)
);

app.use(
  "/api/loggedInUser",
  passport.authenticate("jwt", { session: false }),
  loggedInUserRoutes(prisma, frontEndUrl)
);
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);