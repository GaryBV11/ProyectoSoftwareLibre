const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      sede: true,
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

//Crear un mesa
module.exports.create = async (request, response, next) => {
  let usuario = request.body;
  const newUsuario = await prisma.usuario.create({
    data: {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      telefono: usuario.telefono,
      deleted: false,
      rol: usuario.rol,
      idSede: parseInt(usuario.idSede),
    },
  });
  response.json(newUsuario);
};

//Actualizar un mesa
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idUsuario = request.params.id;
  const newUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      telefono: usuario.telefono,
      deleted: false,
      rol: usuario.rol,
      idSede: parseInt(usuario.idSede),
    },
  });
  response.json(newUsuario);
};
