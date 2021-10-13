const { PrismaClient } = require("@prisma/client");
const { response } = require("express"); //?
const prisma = new PrismaClient();

//get a single car
exports.getCar = (req, res, next) => {
	const id = parseInt(req.params.id);
	prisma.cars.findMany({
		where: {
			id: id,
		}
	})
		.then(car => {
			res.send(car)
		})
};

//get random cars
exports.randomCar = (req, res, next) => {

	prisma.$queryRaw`SELECT * FROM "cars" 
	ORDER BY random() LIMIT 5;`
		.then(cars => {
			res.send(cars)
		})
};

//upload car data
exports.uploadCar = (req, res, next) => {
	const newCars = req.body.results[0].hits.reduce((result, car) => {
		if (car.lotType === 'car') {
			result.push({
				id: car.auctionId,
				make: car.vehicleMake === null ? car.title : car.vehicleMake,
				title: car.title,
				price: car.priceSold,
				image: car.mainImageUrl,
				slug: car.slug,
			})
		}
		return result
	}, []);
	
	prisma.cars.createMany({
		data: [...newCars],
		skipDuplicates: true,
	})
		.then(response => {
			console.log(response);
			res.json({ cars: newCars })
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({
				error: err.message || "Some error occurred while uploading"
			})
		})
	
}
