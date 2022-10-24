import { PrismaClient } from "@prisma/client";
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
    estado:true,
    capacidad:4,
    idSede:1,
},
//2
{
    codigo: "Mesa Individual",
    estado:true,
    capacidad:1,
    idSede:1,
},
//3
{
    codigo: "Mesa Pareja",
    estado:true,
    capacidad:2,
    idSede:1,
},
//2
{
    codigo: "Barra libre",
    estado:false,
    capacidad:1,
    idSede:1,
}
]
