const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesas = await prisma.mesa.findMany({
    orderBy: {
      id: "asc",
    },
  });
  response.json(mesas);
}; 


module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: id,
    },
    include: {
      sede: true
    }
  });
  response.json(mesa);
};

module.exports.getBySede = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesas = await prisma.mesa.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      idSede: id,
    }
  });
  response.json(mesas);
};
