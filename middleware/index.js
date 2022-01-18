const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//check token
exports.authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//check user role, isAdmin
exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err || user.role != "ADMIN") return res.sendStatus(403);
    req.user = user;
    next();
  });
};