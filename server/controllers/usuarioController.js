const { PrismaClient, rol } = require("@prisma/client");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

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
//Buscar por correo
module.exports.getByCorreo = async (request, response, next) => {
  let id = request.params.id;
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: id,
    },
  });
  response.json(usuario);
};



//Crear un usuario
module.exports.create = async (request, response, next) => {
  let newUsuario;
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(request.body.contrasena, salt);

  let usuario = request.body;
  if (usuario.rol == null) {
     newUsuario = await prisma.usuario.create({
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido1: usuario.apellido1,
        apellido2: usuario.apellido2,
        email: usuario.email,
        contrasena: hash,
        telefono: usuario.telefono,
        deleted: false,
        rol: rol.cliente, 
        idSede:1,
      },
    });
  } else {
    const newUsuario = await prisma.usuario.create({
    data: {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      email: usuario.email,
      contrasena: hash,
      telefono: usuario.telefono,
      deleted: false,
      rol: usuario.rol,
      idSede: parseInt(usuario.idSede),
    },
  });
}
  response.json(newUsuario);
};

//Actualizar un usuario
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
      email: usuario.email,
      contrasena: usuario.contrasena,
      telefono: usuario.telefono,
      deleted: false,
      rol: usuario.rol,
      idSede: parseInt(usuario.idSede),
    },
  });
  response.json(newUsuario);
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where: {
      email: userReq.email,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  } else {
    //Verifica la contraseña
    const checkPassword = bcrypt.compare(userReq.password,user.contrasena);
    if (checkPassword) {
      //Si el usuario es correcto: email y password
      //Crear el token
      const payload = {
        email: user.email,
        role: user.role,
      };
      //Crea el token con el payload, llave secreta
      // y el tiempo de expiración
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        data: {
          user,
          token,
        },
      });
    } else {
      response.status(401).send({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
  }
  
};
