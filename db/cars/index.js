const { PrismaClient } = require("@prisma/client");
const { response } = require("express"); //?
const res = require("express/lib/response"); //?
const prisma = new PrismaClient();

//get a single car
exports.getCar = (req, res, next) => {
  const id = parseInt(req.params.id);
  prisma.cars
    .findMany({
      where: {
        id: id,
      },
    })
    .then((car) => {
      res.send(car);
    });
};

//get random cars
exports.randomCar = (req, res, next) => {
  prisma.$queryRaw`SELECT * FROM "cars" 
	ORDER BY random() LIMIT 5;`.then((cars) => {
    res.send(cars);
  });
};

//upload multiple car data
exports.uploadCars = (req, res, next) => {
  const newCars = req.body.results[0].hits.reduce((result, car) => {
    if (car.lotType === "car") {
      result.push({
        id: car.auctionId,
        make: car.vehicleMake === null ? car.title : car.vehicleMake,
        title: car.title,
        price: car.priceSold,
        image: car.mainImageUrl,
        slug: car.slug,
        dateSold: car.dtSoldUTC,
      });
    }
    return result;
  }, []);

  prisma.cars
    .createMany({
      data: [...newCars],
      skipDuplicates: true,
    })
    .then((response) => {
      console.log(response);
      res.json({ cars: newCars });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err.message || "Some error occurred while uploading",
      });
    });
};

//upload single car
exports.uploadCar = (car) => {
  prisma.cars
    .create({
      data: {
        id: car.auctionId,
        make: car.vehicleMake === null ? car.title : car.vehicleMake,
        title: car.title,
        price: car.priceSold,
        image: car.mainImageUrl,
        slug: car.slug,
        dateSold: car.dtSoldUTC,
      },
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message || "Some error occurred while uploading");
    });
};

//find a car by auction id
exports.findCar = async (id) => {
  return await prisma.cars.findFirst({
    where: {
      id,
    },
  });
};
