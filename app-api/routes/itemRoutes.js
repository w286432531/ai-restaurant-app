import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

const itemRoutes = (prisma) => {
  //  @desc Fetch all product
  //  @route GET /api/products
  //  @access Public
  router.get(
    "/",
    expressAsyncHandler(async (req, res) => {
      const items = await prisma.item.findMany();
      res.json(items);
    })
  );
  //  @desc fetch single product
  //  @route GET /api/products/:id
  //  @access Public
  router.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
      const id = parseInt(req.params.id);
      try {
        const item = await prisma.item.findUnique({
          where: {
            id: id,
          },
          include: {
            options: {
              include:{
                option:true,
              },
            },
            ingredients: {
              include:{
                ingredient:true,
              }
            }
          }
        });
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ message: "category not found" });
        }
      } catch (error) {
        res.status(404).json({ message: "Invalid category Id" });
      }
    })
  );
    // options             ItemOption[]
    // ingredients         ItemIngredient[]

  return router
}

export default itemRoutes;