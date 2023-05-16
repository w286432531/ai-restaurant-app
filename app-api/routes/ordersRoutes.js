import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();
const orderRoutes = (prisma) => {
  //  @desc Fetch all product
  //  @route GET /api/products
  //  @access Public
  router.get(
    "/",
    expressAsyncHandler(async (req, res) => {
      const orders = await prisma.order.findMany({
        include: {
          user: {
            include:{
                address:true
            }
          },
          items: {
            include: {
              itemOption: {
                include: {
                  item: true,
                  option: true
                },
              },
            },
          },
        },
      });
    //   delete orders.user["password"];
    for (let order of orders) {
        delete order.user["password"];
    }
      res.json(orders);
    })
  );
  return router;
};
export default orderRoutes;