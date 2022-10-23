const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      id: "asc",
    },
  });
  response.json(usuarios);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
  });
  response.json(usuario);
};
