import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../db/user.js";
import { validUser } from "../utils/validateUser.js";

//login a user
exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (validUser(req.body)) {
    User.getOneByEmail(email).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            //return jwt for user with JWT_SECRET
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
              expiresIn: "10h",
            });
            res.send({ token: accessToken });
          } else {
            res.status(401).send("Invalid email or password");
          }
        });
      } else {
        res.status(401).send("Invalid email or password");
      }
    });
  } else {
    res.status(401).send("Invalid email or password");
  }
};
