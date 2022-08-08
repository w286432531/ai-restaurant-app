import express from "express";
import dotenv from "dotenv";
const app = express();

const PORT = 5000;
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);