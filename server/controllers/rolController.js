const { PrismaClient, rol } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listrols = [];
  for (let element in rol) {
    switch (element) {
      case rol.administrador:
        listrols.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case rol.cliente:
        listrols.unshift({
          ["id"]: element,
          ["nombre"]: "Usuario",
        });
        break;
        case rol.mesero:
            listrols.unshift({
              ["id"]: element,
              ["nombre"]: "Mesero",
            });
            break;
      default:
        listrols.unshift({ ["id"]: rol.cliente, ["nombre"]: "Usuario" });
        break;
    }
  }

  response.json(listrols);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (rol[id]) {
    case rol.administrador:
      nombre = "Administrador";
      break;
    case rol.cliente:
      nombre = "Usuario";
      break;
      case rol.mesero:
      nombre = "mesero";
      break;
    default:
      nombre = "Usuario";
      break;
  }
  let rol = { ["id"]: rol[id], ["nombre"]: nombre };
  response.json(rol);
};
