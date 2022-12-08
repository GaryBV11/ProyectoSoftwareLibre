import { estadoComanda } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const comandas = [
    //1
    {
        idUsuario:"208100007",
            estado:estadoComanda.porPagar,
            direccion:"Alajuela,Naranjo",
            nota:"Familiar Pizza Napolitana",
            subTotal:8000,
            impuesto:600,
            total:8600,
            idMesa:1,
            fecha: new Date('2022-12-10')
       
    },

     //1
     {
        idUsuario:"106580358",
            estado:estadoComanda.porPagar,
            direccion:"Alajuela,San Ramon",
            nota:"Individual Pizza Margherita",
            subTotal:6000,
            impuesto:100,
            total:6100,
            idMesa:2,
            fecha: new Date('2022-12-10')
       
    },

     //1
     {
        idUsuario:"48459757",
            estado:estadoComanda.porPagar,
            direccion:"Alajuela,Zarcero",
            nota:"Barra libre Quattro Stagioni",
            subTotal:12000,
            impuesto:500,
            total:12500,
            idMesa:3,
            fecha: new Date('2022-12-10')
    },

     //1
     {
        idUsuario:"48584516",
            estado:estadoComanda.porPagar,
            direccion:"San Jose",
            nota:"Pareja TRENETTE al PESTO",
            subTotal:4000,
            impuesto:200,
            total:4200,
            idMesa:4,
            fecha: new Date('2022-12-10')
    },
]