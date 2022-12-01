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
  //
  module.exports.delete = async (request, response, next) => {
    let detalle = request.body;

    const buscarProducto = await prisma.detalleComanda.findUnique({
      where:{
        idComanda_idProducto:{
          idComanda: detalle.idComanda,
          idProducto:detalle.idProducto
        }
      }
    })
  if(buscarProducto.cantidad==1){
    const detallecomanda = await prisma.detalleComanda.delete({
      where: {
        idComanda_idProducto:{
          idComanda: detalle.idComanda,
          idProducto:detalle.idProducto
        }
      }
    });
    response.json(detallecomanda);
  }else{
    const newlinea = await prisma.detalleComanda.update({
      where:{
        idComanda_idProducto:{
          idComanda: detalle.idComanda,
          idProducto:detalle.idProducto
        }
      },
      data: {
        cantidad: parseInt(buscarProducto.cantidad-1)
      },
    });
    response.json(newlinea);
  }
  };

  //Crear un mesa
module.exports.create = async (request, response, next) => {
  let detalle = request.body;
 const buscarProducto = await prisma.detalleComanda.findUnique({
    where:{
      idComanda_idProducto:{
        idComanda: detalle.idComanda,
        idProducto:detalle.idProducto
      }
    }
  })
if(buscarProducto==null){
  const detallecomanda = await prisma.detalleComanda.create({
    data: {
      idComanda : detalle.idComanda,
      idProducto : detalle.idProducto,
      cantidad : detalle.cantidad,
    },
  });
  response.json(detallecomanda);
}else{
  const newlinea = await prisma.detalleComanda.update({
    where:{
      idComanda_idProducto:{
        idComanda: detalle.idComanda,
        idProducto:detalle.idProducto
      }
    },
    data: {
      cantidad: parseInt(buscarProducto.cantidad+1)
    },
  });
  response.json(newlinea);
}
};



