const { PrismaClient, Prisma, rol } = require("@prisma/client");

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
      estado : comanda.estado,
      nota:comanda.nota,
      subTotal : comanda.subTotal,
      impuesto: comanda.impuesto,
      total: comanda.total,
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
      total:comanda.total,
      idMesa: comanda.idMesa,
      direccion: comanda.direccion
    },
  });
  response.json(newcomanda);
}


module.exports.notaComanda = async (request, response, next) => {
  let notas = request.body;
  const comanda = await prisma.comanda.update({
    where: {
      id: notas.id,
    },
    data:{
       nota: notas.nota
    },
  });
  response.json(comanda);
};

//Reporte ventasXFecha 
//Hoy
module.exports.reporteXFechas = async (request, response, next) => {
  let result = null;
  let date = new Date();
  result = await prisma.$queryRaw(
    Prisma.sql`SELECT s.nombre as sede, SUM(c.total) as total FROM sede s INNER JOIN mesa m ON m.idSede=s.id INNER JOIN comanda c ON c.idMesa=m.id WHERE c.estado='entregada'AND YEAR(c.fecha)= ${date.getFullYear()} AND MONTH(c.fecha)= ${date.getMonth() + 1} AND DAY(c.fecha)= ${date.getDate()} GROUP BY s.id`
  )
  response.json(result);
  }
  
  //Con filtro
  module.exports.reporteXFechasFiltro = async (request, response, next) => {
    let values = request.body,
    fechaInicial = new Date(values.fechaInicial), 
    fechaFinal = new Date(values.fechaFinal);
    let result = null;
    result = await prisma.$queryRaw(    
      Prisma.sql`SELECT s.nombre as sede, SUM(c.total) as total FROM sede s INNER JOIN mesa m ON m.idSede=s.id INNER JOIN comanda c ON c.idMesa=m.id WHERE c.estado='entregada'AND c.fecha BETWEEN ${fechaInicial} AND ${fechaFinal} GROUP BY s.id`
      )
    response.json(result);
    }








//Reporte ventasXMetodo
//Hoy
module.exports.reporteMetodo = async (request, response, next) => {
  let result = null;
  let date = new Date();
  result = await prisma.$queryRaw(
    Prisma.sql`SELECT d.tipoPago, sum(d.monto) as cantidad FROM detallepago as d INNER JOIN comanda as c on d.idComanda = c.id WHERE YEAR(c.fecha)= ${date.getFullYear()} AND MONTH(c.fecha)= ${date.getMonth() + 1} AND DAY(c.fecha)= ${date.getDate()}  GROUP BY d.tipoPago`
  )
  console.log(result);
  response.json(result);
  }
  
  //Con filtro
  module.exports.reporteMetodoFiltro = async (request, response, next) => {
    let values = request.body,
    fechaInicial = new Date(values.fechaInicial), 
    fechaFinal = new Date(values.fechaFinal),
    filtro = values.filtro ;
    let result = null;
    
    if (filtro == 'ambas') {
      result = await prisma.$queryRaw(
      Prisma.sql`SELECT d.tipoPago, sum(d.monto) as cantidad FROM detallepago as d INNER JOIN comanda as c on d.idComanda = c.id WHERE c.fecha BETWEEN ${fechaInicial} AND ${fechaFinal} group by d.tipoPago`
    )} else {
      result = await prisma.$queryRaw(
        Prisma.sql`SELECT d.tipoPago, sum(d.monto) as cantidad FROM detallepago as d INNER JOIN comanda as c on d.idComanda = c.id WHERE c.fecha BETWEEN ${fechaInicial} AND ${fechaFinal} AND d.tipoPago = ${filtro}`
      )
    }
    response.json(result);
    }


    //Con filtro
  module.exports.reporteVarios = async (request, response, next) => {
    let values = request.body,
    fechaInicial = new Date(values.fechaInicial), 
    fechaFinal = new Date(values.fechaFinal),
    filtro = values.filtro, id = values.id, rolUsuario = values.rol ;
    let result = null;
console.log(values);

if (rolUsuario == rol.mesero) {
if (filtro == 'mesa') {
  if (filtro == 'mesa') {
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT m.codigo as nombre, SUM(c.total) as total FROM comanda c inner join mesa m on c.idMesa = m.id inner join usuario u on c.idUsuario = u.id WHERE c.estado = 'entregada' and c.fecha BETWEEN ${fechaInicial} and ${fechaFinal} AND u.id = ${id}`
    )
  }
}
if (filtro == 'mesero') {
  result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.nombre as nombre, SUM(c.total) as total FROM comanda c inner join usuario u on c.idUsuario = u.id WHERE c.estado = 'entregada' and c.fecha BETWEEN ${fechaInicial} and ${fechaFinal} AND u.id = ${id}`
  )
}
if (filtro == 'producto') {
  result = await prisma.$queryRaw(
    Prisma.sql`SELECT p.descripcion as nombre, SUM(d.cantidad*p.precio) as total FROM producto p INNER JOIN detallecomanda d ON d.idProducto=p.id INNER JOIN comanda c on c.id=d.idComanda INNER JOIN usuario u on c.idUsuario=u.id WHERE c.estado='entregada'AND u.rol='mesero' AND c.fecha BETWEEN ${fechaInicial} and ${fechaFinal} AND u.id=${id} GROUP BY p.descripcion`
  )
}
}
if (rolUsuario == rol.administrador) {
  if (filtro == 'mesa') {
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT m.codigo as nombre, SUM(c.total) as total FROM comanda c inner join mesa m on c.idMesa = m.id where c.fecha BETWEEN ${fechaInicial} and ${fechaFinal}`
    )
    console.log(result);
  }
  if (filtro == 'mesero') {
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT u.nombre as nombre, SUM(c.total) as total FROM comanda c inner join usuario u on c.idUsuario = u.id WHERE c.estado = 'entregada' and c.fecha BETWEEN ${fechaInicial} and ${fechaFinal} GROUP BY u.nombre`
    )
  }
  if (filtro == 'producto') {
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT p.descripcion as nombre, SUM(d.cantidad*p.precio) as total FROM producto p INNER JOIN detallecomanda d ON d.idProducto=p.id INNER JOIN comanda c on c.id=d.idComanda INNER JOIN usuario u on c.idUsuario=u.id WHERE c.estado='entregada'AND u.rol='mesero' AND c.fecha BETWEEN ${fechaInicial} and ${fechaFinal} GROUP BY p.descripcion`
    )
  }
  }
 
    response.json(result);
    }