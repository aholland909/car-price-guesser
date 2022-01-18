//upload data

const axios = require("axios");
const cc = require("./requests.js");
const car = require("../db/cars");

const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

async function getCars() {
  try {
    let page = 0;
    let getData = true;
    while (getData) {
      const response = await axios.post(
        cc.collectingCarsHost(),
        cc.collectingCarsBody(page)
      );
      const cars = response.data.results[0].hits;
      if (cars.length == 0) {
        getData = false;
        return;
      }
      for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index];
        //check if already in database
        let findCar = await car.findCar(currentCar.auctionId);
        if (findCar) {
          console.log(`${currentCar.auctionId} is already in database`);
        } else {
          //add to database
          car.uploadCar(currentCar);
          console.log(`Added ${currentCar.auctionId}`);
        }
      }
      page++;
    }
  } catch (error) {
    console.error(error);
  }
}

getCars();
