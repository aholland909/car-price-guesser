const path = require("path");
const express = require("express");
const app = express();

const car = require("./db/cars");
const login = require("./auth/login.js");

const { authToken } = require("./middleware");

app.use(express.json({ limit: "500mb" }));
app.use(express.static(path.resolve(__dirname, "./apps/car-guesser/build")));

app.get("/car/:id", car.getCar);
app.get("/randomcar/", car.randomCar);
app.post("/upload/", car.uploadCar);

app.post("/login/", login.loginUser);

app.get("/protected/", authToken, (req, res) => {
  res.send("Nice one");
});

app.get("*", (req, res) => {
  console.log(__dirname);
  res.sendFile(
    path.resolve(__dirname, "./apps/car-guesser/build/", "index.html")
  );
});

app.listen(5000);
