import express from "express";
import expressAsyncHandler from "express-async-handler";
import passport from "passport";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const userRoutes = (prisma, secret) => {
  router.post(
    "/login",
    expressAsyncHandler(async (req, res, next) => {
      await passport.authenticate("login", async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error("An error occurred.");
            console.log(err);
            console.log(info.message);
            //TODO maybe send back error message?
            return res.status(401).json({ message: info.message });
          }
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            const body = { id: user.id, email: user.email };
            const token = jwt.sign({ user: body }, secret, {
              expiresIn: "30d",
            });

            return res.json({ token });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    })
  );

  router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    expressAsyncHandler(async (req, res, next) => {
      console.log('in async handler');
      const body = { id: req.user.id, email: req.user.email };
      const token = jwt.sign({ user: body }, secret, {
        expiresIn: "30d",
      });

      return res.json({ token });
    })
  );

  return router;
};

const loggedInUserRoutes = (prisma) => {
  router.get(
    "/profile",
    expressAsyncHandler((req, res, next) => {
      res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
      });
    })
  );
  return router;
};
export { userRoutes, loggedInUserRoutes };
