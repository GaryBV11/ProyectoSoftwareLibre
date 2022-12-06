const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getByComanda = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const detallespago = await prisma.detallePago.findMany({
    where: {
      id: id,
    }
  });
  response.json(detallespago);
};

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const detallepago = await prisma.detallePago.findUnique({
      where: {
        id: id,
      }
    });
    response.json(detallepago);
  };

  //Crear un mesa
module.exports.create = async (request, response, next) => {
  let pago = request.body;
  const newPago = await prisma.detallePago.create({
    data: {
      tipoPago: pago.tipoPago,
      monto: pago.monto,
      idComanda: pago.idComanda
    },
  });
  response.json(newPago);
};