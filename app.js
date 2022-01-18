const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const car = require("./db/cars");
const login = require("./auth/login.js");
const signup = require("./auth/signup.js");

const { authToken, isAdmin } = require("./middleware");

app.use(express.json({ limit: "500mb" }));
app.use(express.static(path.resolve(__dirname, "./apps/car-guesser/build")));

app.get("/car/:id", car.getCar);
app.get("/randomcar/", car.randomCar);
app.post("/upload/", isAdmin, car.uploadCars);

app.post("/login/", login.loginUser);
// app.post("/signup/", signup.signupUser);

app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(
    path.resolve(__dirname, "./apps/car-guesser/build/", "index.html")
  );
});

app.listen(process.env.PORT || 5000);
