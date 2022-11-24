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

module.exports.getUltimaByIdMesa = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const comanda = await prisma.comanda.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      idMesa: id,
    },
   take : 1,
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

//Crear un mesa
module.exports.create = async (request, response, next) => {
  let comanda = request.body;
  const newComanda = await prisma.comanda.create({
    data: {
      idUsuario : comanda.idUsuario,
      estado : 'registrado',
      subTotal : 0,
      impuesto: 0,
      total: 0,
      idMesa: comanda.idMesa

    },
  });
  response.json(newComanda);
};

//Actualizar un mesa
module.exports.update = async (request, response, next) => {
  let mesa = request.body;
  let idMesa = parseInt(request.params.id);
  /*//Obtener mesa vieja
  const mesaVieja = await prisma.mesa.findUnique({
    where: { id: idMesa },
  });*/
const newmesa = await prisma.mesa.update({
  where: {
    id: idMesa,
  },
  data: {
    codigo: mesa.codigo,
    capacidad: parseInt(mesa.capacidad),
    idSede: mesa.idSede,
    estado: mesa.estado,
  },
});
response.json(newmesa);
};





