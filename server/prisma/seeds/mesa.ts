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
    codigo: "C01",
    estado:estadoMesa.libre,
    capacidad:4,
    idSede:1,
   
},
{
    codigo: "C02",
    estado:estadoMesa.reservada,
    capacidad:4,
    idSede:1,
   
},
{
    codigo: "C03",
    estado:estadoMesa.ocupada,
    capacidad:2,
    idSede:1,
   
},

//2
{
    codigo: "S01",
    estado:estadoMesa.libre,
    capacidad:1,
    idSede:4,
    
},
{
    codigo: "S02",
    estado:estadoMesa.ocupada,
    capacidad:2,
    idSede:4,
    
},
//3
{
    codigo: "O01",
    estado:estadoMesa.libre,
    capacidad:2,
    idSede:2,

},
//4
{
    codigo: "E01",
    estado:estadoMesa.libre,
    capacidad:1,
    idSede:3,

}
]
