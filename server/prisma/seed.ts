import { PrismaClient } from '@prisma/client';
import { usuarios } from './seeds/usuario';
import { productos } from './seeds/producto';
import { sedes } from './seeds/sede';
import { mesas } from './seeds/mesa';


const prisma = new PrismaClient();

async function main() {

  //Sedes
   await prisma.sede.createMany({
    data: sedes
  });
 
  //Productos
  //Llama al metodo proguctos de el archivo producto.ts para ejecutar los insert individuales
  productos();
  
 // Usuarios
  await prisma.usuario.createMany({
    data: usuarios
  }); 
  await prisma.mesa.createMany({
    data: mesas});


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