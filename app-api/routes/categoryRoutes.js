import express from "express";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

//  @desc Fetch all product
//  @route GET /api/products
//  @access Public
const categoryRoutes = (prisma) => {
  router.get(
    "/",
    expressAsyncHandler(async (req, res) => {
      const categories = await prisma.category.findMany({
        include: {
          items: {
            include: {
              options: {
                include: {
                  option: true,
                },
              },
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      });
      res.json(categories);
    })
  );
  //  @desc fetch single produc
  //  @route GET /api/products/:id
  //  @access Public
  router.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
      const id = parseInt(req.params.id);
      try {
        const category = await prisma.category.findUnique({
          where: {
            id: id,
          },
          include: {
            items: true,
          },
        });
        if (category) {
          res.json(category);
        } else {
          res.status(404).json({ message: "category not found" });
        }
      } catch (error) {
        res.status(404).json({ message: "Invalid category Id" });
      }
    })
  );
  return router;
};
export default categoryRoutes;
