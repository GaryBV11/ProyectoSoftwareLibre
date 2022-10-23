const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getByComanda = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const detallespago = await prisma.detallepago.findMany({
    where: {
      id: id,
    }
  });
  response.json(detallespago);
};

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const detallepago = await prisma.detallepago.findUnique({
      where: {
        id: id,
      }
    });
    response.json(detallepago);
  };