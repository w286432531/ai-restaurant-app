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
    "/modify-item",
    expressAsyncHandler(async (req, res) => {
      console.log("got request");
      try {
        const options = await prisma.option.findMany();
        const ingredients = await prisma.ingredientType.findMany({
          include: {
            ingredients: true,
          },
        });
        if (options && ingredients) {
          res.json({ options: options, ingredients: ingredients });
        } else {
          res.status(404).json({ message: "something is not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
    })
  );
  router.post(
    "/modify-item",
    expressAsyncHandler(async (req, res) => {
      console.log("got request");
      console.log(req.user);
      console.log(req.body);
      const selectedOptions = [];
      for (let key in req.body.options) {
        let currentOption = {
          option: {
            connect: {
              id: parseInt(key),
            },
          },
          price: req.body.options[key],
        };
        selectedOptions.push(currentOption);
      }
      const selectedIngredients = [];
      for (let ingredientId of req.body.ingredients) {
        let ingredient = {
          ingredient: {
            connect: { id: ingredientId },
          },
        };
        selectedIngredients.push(ingredient);
      }
      try {
        const item = await prisma.item.create({
          data: {
            itemName: req.body.itemName,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            itemCategory: {
              connect: {
                id: parseInt(req.body.categoryId),
              },
            },
            options: {
              create: selectedOptions,
            },
            ingredients: {
              create: selectedIngredients,
            },
          },
        });
        res.json(item);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
    })
  );
  router.put(
    "/modify-item",
    expressAsyncHandler(async (req, res) => {
      console.log("got request");
      console.log(req.user);
      console.log(req.body);
      const selectedOptions = [];
      for (let key in req.body.options) {
        let currentOption = {
          option: {
            connect: {
              id: parseInt(key),
            },
          },
          price: req.body.options[key],
        };
        selectedOptions.push(currentOption);
      }
      const selectedIngredients = [];
      for (let ingredientId of req.body.ingredients) {
        let ingredient = {
          ingredient: {
            connect: { id: ingredientId },
          },
        };
        selectedIngredients.push(ingredient);
      }
      try {
        const item = await prisma.item.update({
          where: { id: req.body.itemId },
          data: {
            itemName: req.body.itemName,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            itemCategory: {
              connect: {
                id: parseInt(req.body.categoryId),
              },
            },
            options: {
              deleteMany: {},
              create: selectedOptions,
            },
            ingredients: {
              deleteMany: {},
              create: selectedIngredients,
            },
            isAvailable: req.body.isAvailable,
            isInStock: req.body.isInStock,
          },
        });
        res.json(item);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
    })
  );
  router.delete(
    "/modify-item",
    expressAsyncHandler(async (req, res) => {
      console.log("got request");
      try {
        const item = await prisma.item.update({
          where: { id: req.body.itemId },
          data: {
            isAvailable: false,
          },
        });
        res.json(item);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
    })
  );
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
        });
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ message: "Item not found" });
        }
      } catch (error) {
        res.status(404).json({ message: "Invalid item Id" });
      }
    })
  );

  //  @desc Fetch all product
  //  @route GET /api/products
  //  @access Public

  // options             ItemOption[]
  // ingredients         ItemIngredient[]

  return router;
};
export default itemRoutes;
