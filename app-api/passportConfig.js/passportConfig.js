import { Strategy, ExtractJwt } from "passport-jwt";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";

 const isValidPassword = async (inputPassword, userPassword) =>{
    const valid = await bcrypt.compare(inputPassword, userPassword);
    return valid;
 }
 const passportConfig = (passport, prisma, secret) => {
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            }
          });
          
          if (!user) {
            console.log('no user');
            return done(null, false, { message: "User not found" });
          }

          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }
          //delete user password
          delete user['password'];
          console.log(user);
          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await prisma.user.create({
            data: {
              email: email,
              password: await bcrypt.hash(password, 10),
              userRole: { connect: { role: "user" } },
            },
          });
          return done(null, user);
        } catch (error) {
          //TODO maybe send back error message?
          done(error);
        }
      }
    )
  );
  passport.use(
    new Strategy(
      {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
export default passportConfig;