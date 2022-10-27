const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      sedes: true
    }
  });
  response.json(productos);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      sedes: true
    }
  });
  response.json(producto);
};

module.exports.getBySede = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const productos = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      idSede: id,
    }
  });
  response.json(productos);
};
