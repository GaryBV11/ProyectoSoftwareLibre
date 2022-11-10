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


//Crear un mesa
module.exports.create = async (request, response, next) => {
  let mesa = request.body;
  let countCodigo =  await prisma.mesa.count({
    where: {
      idSede: mesa.idSede
    }
    
  }) + 1;
console.log(countCodigo);
  let sede = await prisma.sede.findUnique({
    where: {
      id: mesa.idSede
    }
  });
  let codigoGenerado = `${sede.nombre.charAt(0)}${countCodigo < 10?0:''}${countCodigo}`;
  const newMesa = await prisma.mesa.create({
    data: {
      codigo: codigoGenerado,
      capacidad: parseInt(mesa.capacidad),
      estado: mesa.estado,
      idSede: mesa.idSede,
     
    },
  });
  response.json(newMesa);
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

