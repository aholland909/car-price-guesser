const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../db/user.js");
const { validUser } = require("../utils/validateUser.js");

dotenv.config();

//signup a user
exports.signupUser = (req, res, next) => {
  const { email, password } = req.body;
  //check username and password
  if (validUser(req.body)) {
    //check user is in db
    User.getOneByEmail(email).then((user) => {
      if (!user) {
        //new user
        bcrypt.hash(password, 8).then((hash) => {
          const newUser = {
            email: email,
            hash: hash,
          };
          User.addUser(newUser).then((user) => {
            res.send({ userID: user.id, message: "User created" });
          });
        });
      } else {
        res.status(401).send("User exists");
      }
    });
  }
};
