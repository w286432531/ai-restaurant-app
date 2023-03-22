import express from "express";
import expressAsyncHandler from "express-async-handler";
import { menuItems } from "../data.js";
const router = express.Router();

//  @desc Fetch all product
//  @route GET /api/products
//  @access Public
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = menuItems;
    res.json(products);
  })
);
//  @desc fetch single produc
//  @route GET /api/products/:id
//  @access Public
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      //   const product = await Product.findById(req.params.id);
      const product = menuItems[req.params.id];
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(404).json({ message: "Invalid product Id" });
    }
  })
);
// if (product) {
//   res.json(product)
// } else {
//   res.status(404);
//   throw new Error('Product not found');
// }
export default router;