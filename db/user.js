const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get a user from the db
exports.getOneByEmail = (email) => {
  return prisma.users.findFirst({
    where: {
      email,
    },
  });
};

exports.addUser = (user) => {
  return prisma.users.create({
    data: {
      email: user.email,
      password: user.hash,
      role: "USER"
    },
  });
};
