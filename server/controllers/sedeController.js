const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const sedes = await prisma.sede.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      mesas: true
    }
  });
  response.json(sedes);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const sede = await prisma.sede.findUnique({
    where: {
      id: id,
    },
    include: {
      mesas: true
    }
  });
  response.json(sede);
};

