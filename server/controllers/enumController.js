const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getEstadosMesa = async (request, response, next) => {
  const datos =
    await prisma.$queryRaw`SELECT COLUMN_TYPE as valores FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'tmilandb' AND TABLE_NAME = 'mesa' AND COLUMN_NAME = 'Estado'`;
    console.log(datos);
    let campos = JSON.stringify(datos)
    .replace('[{"valores":"enum(', "")
    .replace(')"}]', "")
    .split(["'", "'"]);
  for (let index = 0; index < campos.length; index++) {
    campos[index] = campos[index].replace("'","");
  }
  console.log(campos);
  response.json(campos);
};


module.exports.getRoles = async (request, response, next) => {
  const datos =
    await prisma.$queryRaw`SELECT COLUMN_TYPE as valores FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'tmilandb' AND TABLE_NAME = 'usuario' AND COLUMN_NAME = 'rol'`;
    console.log(datos);
    let campos = JSON.stringify(datos)
    .replace('[{"valores":"enum(', "")
    .replace(')"}]', "")
    .split(["'", "'"]);
  for (let index = 0; index < campos.length; index++) {
    campos[index] = campos[index].replace("'","");
  }
  console.log(campos);
  response.json(campos);
};

