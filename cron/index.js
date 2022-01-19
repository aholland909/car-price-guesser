/*
* Upload data
* Options
--stop  -> stop at duplicates 
--sleep -> sleep time between cars
*/

const axios = require("axios");
const cc = require("./requests.js");
const car = require("../db/cars");
const { getArgs } = require("../utils/getArgs");

const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

const args = getArgs();

const getCars = async () => {
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
          if (args.stop ? args.stop : false) getData = false;
        } else {
          //add to database
          car.uploadCar(currentCar);
          console.log(`Added ${currentCar.auctionId}`);
        }
        await sleep(args.sleep ? args.sleep : 0);
      }
      page++;
    }
  } catch (error) {
    console.error(error);
  }
};

getCars();
