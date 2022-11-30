const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      sedes: true
    }
  });
  response.json(productos);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      sedes: true
    }
  });
  response.json(producto);
};

module.exports.getBySede = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesas = await prisma.sede.findUnique({
    where: {
      id: id,
    },include:{productos:true}
  });
  response.json(mesas);
};

module.exports.create=async(request, response, next)=>{
  let producto= request.body;
  const newproducto= await prisma.producto.create({
    data:{
      descripcion:producto.descripcion,
      precio:producto.precio,
      ingredientes:producto.ingredientes,
      categoria:producto.categoria,
      estado:producto.estado,
      imagenURL:producto.imagenURL,
      sedes:{
        connect: producto.sedes

      }
    }
  });
  response.json(newproducto);
}

module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idproducto = parseInt(request.params.id);
  //Obtener producto viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idproducto },
    include: {
      sedes: {
        select:{
          id:true
        }
      }
    }
  });

  const newproducto = await prisma.producto.update({
    where: {
      id: idproducto
    },
    data: {
      descripcion:producto.descripcion,
      precio:producto.precio,
      ingredientes:producto.ingredientes,
      categoria:producto.categoria,
      estado:producto.estado,
      imagenURL:producto.imagenURL,
      sedes: {
        //Sedes tiene que ser {id:valor}
        disconnect:productoViejo.sedes,
        connect: producto.sedes,
      },
    },
  });
  response.json(newproducto);
};

