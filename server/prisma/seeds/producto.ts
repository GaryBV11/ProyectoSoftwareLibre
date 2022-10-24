import { categoriaProducto } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const productos = async () => {
  const prisma = new PrismaClient();

  await prisma.producto.create({
    data: {
      descripcion: "Pizza Napolitana",
      precio: 8000,
      ingredientes: "Salsa de tomate,jamon,queso",
      categoria: categoriaProducto.platoPrincipal,
      estado: false,
      sedes: {
        connect: [{ id: 1 }],
      },
    },
  });

  await prisma.producto.create({
    data: {
      descripcion: "Pizza Margherita",
      precio: 6000,
      ingredientes: " Queso mozzarella,tomate, aceite y albahaca",
      categoria: categoriaProducto.platoPrincipal,
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 3 }],
      },
    },
  });
};


/*
export const productos=[
    //1
    {
        descripcion:"Pizza Napolitana",
        precio:8000,
        ingredientes:"Salsa de tomate,jamon,queso",
        categoria:categoriaProducto.platoPrincipal,
        estado: false,
        sedes: {
            connect:[{id:1}]       
     }
    },*/
/* {
        descripcion:"Pizza Margherita",
        precio:6000,
        ingredientes:" Queso mozzarella,tomate, aceite y albahaca",
        categoria:categoriaProducto.platoPrincipal,
        estado: true,
        sede:1,
    },*/
/*  {
        descripcion:"pizza Quattro Stagioni",
        precio:12000,
        ingredientes:"jamón cocido, setas, alcachofas y aceitunas negra",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    },
    {
        descripcion:"pizza Prosciutto e funghi",
        precio:7000,
        ingredientes:"Salsa de tomate,jamon al horno",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    },
    {
        descripcion:"Pizza Diavola",
        precio:9000,
        ingredientes:"Salsa de tomate,peperoni,salami picante,queso",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    }, 
    {
        descripcion:"FETUCCINI ALLA PUTTANESCA",
        precio:4000,
        ingredientes:"ajo, tomate, guindillas secas, aceite de oliva virgen y anchoas en salmuera",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    },
    {
        descripcion:"TRENETTE al PESTO",
        precio:4000,
        ingredientes:"albahaca, ajo,aceite de oliva,judías y papas cocidas  en trozos",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    },
    {
        descripcion:"VERMICELLI CON LE VONGOLE",
        precio:4000,
        ingredientes:"sofrito de ajo, aceite de oliva virgen, vino blanco, almejas y tomate",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    } , 
    {
        descripcion:" Risotto alla milanese",
        precio:5000,
        ingredientes:"tuétano de buey, cebolla, caldo de carne, mantequilla,hebras de azafrán, vino blanco, pimienta, sal y el arroz",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    } ,
    {
        descripcion:"pesto alla genovese",
        precio:5000,
        ingredientes:" ajo, albahaca, piñones, queso parmesano rallado y aceite de oliva virgen",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    }, 
    {
        descripcion:"Aceitunas con naranja y limón",
        precio:2000,
        ingredientes:"aceitunas,ralladuras de naranja y de limón, el chalote, la canela y las semillas tostadas.",
        categoria:categoriaProducto.platoPrincipal,
        estado:1,
    } 
    
*/
