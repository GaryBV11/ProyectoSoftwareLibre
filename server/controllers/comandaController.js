const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const comandas = await prisma.comanda.findMany({
    orderBy: {
      id: "asc",
    },include: {
      usuario: true,
      detallesComanda: {
        select: {
          idComanda: false,
          producto: true,
          cantidad: true,
        },
      },
    },
  });
  response.json(comandas);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const comanda = await prisma.comanda.findUnique({
    where: {
      id: id,
    },
    include: {
      usuario: true,
      detallesComanda: {
        select: {
          idComanda: false,
          producto: true,
          cantidad: true,
          producto: true
        },
      },    
    },
  });
  response.json(comanda);
};





