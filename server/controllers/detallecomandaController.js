const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



module.exports.getByComanda = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const detallecomanda = await prisma.detalleComanda.findMany({
      where: {
        idComanda: id
      },
      include: {
        producto: true,
      },
    });
    response.json(detallecomanda);
  };