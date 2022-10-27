const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const detallecomanda = await prisma.detalleComanda.findUnique({
      where: {
        id: id,
      },
      include: {
        producto: true,
      },
    });
    response.json(detallecomanda);
  };