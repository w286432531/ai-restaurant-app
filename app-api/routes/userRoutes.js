import express from "express";
import expressAsyncHandler from "express-async-handler";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const userRoutes = (prisma, secret, frontEndUrl, environment) => {
  const setAccessTokenCookie = (user, res, environment) => {
    const body = { id: user.id, email: user.email };
    const token = jwt.sign({ user: body }, secret, {
      expiresIn: "30d",
    });
    res.cookie("access_token", token, {
      httpOnly: environment === "production",
      //   maxAge: 60 * 60 * 1000, // 1 hour
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: environment === "production", // Only send cookies over HTTPS in production
    });
  };
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
            setAccessTokenCookie(user, res, environment);
            return res.status(200).json({ message: "Logged in successfully." });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    })
  );
  router.get(
    "/googleLogin",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/googleLogin/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: frontEndUrl + "/user/login",
    }),
    expressAsyncHandler(async (req, res) => {
      //   console.log("after google method", req.user);
      setAccessTokenCookie(req.user, res, environment);
      res.redirect(frontEndUrl);
    })
  );
  router.get(
    "/checkLogin",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.sendStatus(200);
    }
  );

  router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    expressAsyncHandler(async (req, res, next) => {
      console.log("in async handler");
      setAccessTokenCookie(req.user, res, environment);
      return res
        .status(200)
        .json({ message: "Register and login successfully." });
    })
  );

  return router;
};

const loggedInUserRoutes = (prisma, frontEndUrl) => {
  router.post(
    "/profile",
    expressAsyncHandler(async (req, res, next) => {
      // console.log(req);
      console.log("in profile", req.user);
      const user = await prisma.user.findUnique({
        where: {
          email: req.user.email,
        },
      });
      delete user["password"];
      res.json(user);
    })
  );
  router.get(
    "/logout",
    expressAsyncHandler((req, res, next) => {
      res.clearCookie("google-credentials");
      res.clearCookie("access_token");
      res.send("Logged out successfully.");
    })
  );
  return router;
};
export { userRoutes, loggedInUserRoutes };
//google call back uri
//http://localhost:5000/api/user/googleLogin/callback
