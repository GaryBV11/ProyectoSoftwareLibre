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
          comanda: true,
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
          comanda: true,
          cantidad: true,
          comanda: true
        },
      },    
    },
  });
  response.json(comanda);
};

module.exports.getUltima = async (request, response, next) => {
const comanda = await prisma.comanda.findMany({
    orderBy: {
      id: "desc",
    },
    take : 1,
    include: {
       detallesComanda: {
         select: {
           idComanda: false,
           comanda: true,
           cantidad: true,
           comanda: true
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
          comanda: true,
          cantidad: true,
          comanda: true
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


/*
//Actualizar un mesa
module.exports.update = async (request, response, next) => {
  let mesa = request.body;
  let idMesa = parseInt(request.params.id);
  /*///*Obtener mesa vieja
 /* const mesaVieja = await prisma.mesa.findUnique({
    where: { id: idMesa },
  });*/
/*const newmesa = await prisma.mesa.update({
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

*/

//Actualizar comanda
module.exports.update = async (request, response, next) => {
  let comanda = request.body;
  let idComanda = parseInt(request.params.id);
 
  const newcomanda = await prisma.comanda.update({
    where: {
      id: idComanda
    },
    data: {
      idUsuario: comanda.idUsuario,
      estado:comanda.estado,
      nota: comanda.nota,
      subTotal:comanda.subTotal,
      impuesto:comanda.impuesto,
      totol:comanda.total,
      idMesa: comanda.idMesa,
      direccion: comanda.direccion
    },
  });
  response.json(newcomanda);
}

