import { PrismaClient } from '@prisma/client';
import { usuarios } from './seeds/usuario';
import { productos } from './seeds/producto';
import { sedes } from './seeds/sede';
import { mesas } from './seeds/mesa';
import { comandas } from './seeds/comanda';
import { comandasDetalles } from './seeds/comandaDetalle';




const prisma = new PrismaClient();

async function main() {

  //Sedes
   await prisma.sede.createMany({
    data: sedes
  }); 
 
  //Productos
  //Llama al metodo proguctos de el archivo producto.ts para ejecutar los insert individuales
 await productos();
  
 // Usuarios
  await prisma.usuario.createMany({
   data: usuarios
   }); 

   await prisma.mesa.createMany({
    data: mesas});
    
    await prisma.comanda.createMany({
      data: comandas});
  

   await prisma.detalleComanda.createMany({
    data: comandasDetalles});

}

  main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });