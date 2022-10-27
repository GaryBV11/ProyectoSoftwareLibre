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
      imagenURL:"https://osojimix.com/wp-content/uploads/2022/06/Para-la-masa-de-pizza-napolitana-8-hrs-fermentacion-Web-1.jpg",
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
      imagenURL:"https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 3 }],
      },
    },
  });
  
  await prisma.producto.create({
    data: {
      descripcion:"pizza Quattro Stagioni",
      precio:12000,
      ingredientes:"jamón cocido, setas, alcachofas y aceitunas negra",
      categoria:categoriaProducto.platoPrincipal,
      imagenURL:"https://i0.wp.com/www.piccolericette.net/piccolericette/wp-content/uploads/2016/07/3017_Pizza.jpg?resize=895%2C616&ssl=1",
      estado: true,
      sedes: {
        connect: [{ id: 4 }, { id: 1 }],
      },
    },
  });

  await prisma.producto.create({
    data: {
      descripcion:"pizza Prosciutto e funghi",
      precio:7000,
      ingredientes:"Salsa de tomate,jamon al horno",
      categoria: categoriaProducto.platoPrincipal,
      imagenURL:"https://ristorantecapone.com/backoffice/upload/productos/1619_96_1_f.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 1}],
      },
    },
  });

  await prisma.producto.create({
    data: {
      descripcion:"Pizza Diavola",
      precio:9000,
      ingredientes:"Salsa de tomate,peperoni,salami picante,queso",
      categoria: categoriaProducto.platoPrincipal,
      imagenURL:"https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/03/d2.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 1}],
      },
    },
  });

  await prisma.producto.create({
    data: {
      descripcion:"FETUCCINI ALLA PUTTANESCA",
        precio:4000,
        ingredientes:"ajo, tomate, guindillas secas, aceite de oliva virgen y anchoas en salmuera",
      categoria: categoriaProducto.platoPrincipal,
      imagenURL:"https://2.bp.blogspot.com/-V2qBKv7ozRc/W3G7vFqjOlI/AAAAAAAAMI4/hwwIbEdFnOk41XHWhtbOO7ZvsXF6mwFbQCLcBGAs/s1600/img_1853.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 1 }, { id: 3 }],
      },
    },
  });

  
  await prisma.producto.create({
    data: {
      descripcion:"TRENETTE al PESTO",
      precio:4000,
      ingredientes:"albahaca, ajo,aceite de oliva,judías y papas cocidas  en trozos",
      categoria: categoriaProducto.platoPrincipal,
      imagenURL:"http://laurainthekitchen.com/500x300thumbnails/trenette-al-pesto.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 1}],
      },
    },
  });

  await prisma.producto.create({
    data: {
      descripcion:" Risotto alla milanese",
        precio:5000,
        ingredientes:"tuétano de buey, cebolla, caldo de carne, mantequilla,hebras de azafrán, vino blanco, pimienta, sal y el arroz",
      categoria: categoriaProducto.platoPrincipal,
      imagenURL:"https://www.menu.it/media/ricette/risotto-alla-milanese-104419/conversions/PP019_Risotto-alla-milanese-main.jpg",
      estado: true,
      sedes: {
        connect: [{ id: 2 }, { id: 1}],
      },
    },
  });


};


/*  
   
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
