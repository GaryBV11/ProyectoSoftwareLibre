import { PrismaClient } from "@prisma/client";
import {estadoMesa } from "@prisma/client";
// export const mesas = async () => {
//     const prisma = new PrismaClient();
//     await prisma.mesa.create({
//         data: {
//           codigo: "Mesa familiar",
//           estado:true,
//           capacidad:4,
//           idSede:1,
//         },
//       });
// }
export const mesas = [
//1
{
    codigo: "Mesa familiar",
    estado:estadoMesa.libre,
    capacidad:4,
    idSede:1,
   
},
//2
{
    codigo: "Mesa Individual",
    estado:estadoMesa.libre,
    capacidad:1,
    idSede:1,
    
},
//3
{
    codigo: "Mesa Pareja",
    estado:estadoMesa.libre,
    capacidad:2,
    idSede:2,

},
//2
{
    codigo: "Barra libre",
    estado:estadoMesa.libre,
    capacidad:1,
    idSede:3,

}
]
