import { Strategy, ExtractJwt } from "passport-jwt";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
 const isValidPassword = async (inputPassword, userPassword) =>{
    const valid = await bcrypt.compare(inputPassword, userPassword);
    return valid;
 }
 const passportConfig = (passport, prisma, secret, clientID, clientSecret) => {
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
             },
           });

           if (!user) {
             console.log("no user");
             return done(null, false, { message: "User not found" });
           }

           const validate = await isValidPassword(password, user.password);
           if (!validate) {
             return done(null, false, { message: "Wrong Password" });
           }
           delete user["password"];
        //    console.log(user);
           return done(null, user, { message: "Logged in Successfully" });
         } catch (error) {
           return done(error);
         }
       }
     )
   );
   passport.use(
     new GoogleStrategy(
       {
         // saved google client id and client secret in .env
         clientID: clientID,
         clientSecret: clientSecret,
         // same as on google cloud console
         callbackURL: "/api/user/googleLogin/callback",
       },
      async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        const user = await prisma.user.upsert({
          where: {
            email: profile._json["email"],
          },
          update: {},
          create: {
            email: profile._json["email"],
            username: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            roleId:1
          },
        });
        return cb(null,user);
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
   const cookieExtractor = (req) => {
     let token = null;
     if (req && req.cookies) {
       token = req.cookies["access_token"];
     }
     return token;
   };
   passport.use(
     new Strategy(
       {
         secretOrKey: secret,
         jwtFromRequest: ExtractJwt.fromExtractors([
           ExtractJwt.fromAuthHeaderAsBearerToken(),
           cookieExtractor,
         ]),
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