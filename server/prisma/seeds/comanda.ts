import { estadoComanda } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const comandas = [
    //1
    {
        idUsuario:"208100007",
            estado:estadoComanda.enProceso,
            direccion:"Alajuela,Naranjo",
            nota:"Familiar Pizza Napolitana",
            subTotal:8000,
            impuesto:600,
            total:8600,
            idMesa:1,
       
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
       
    },

     //1
     {
        idUsuario:"48459757",
            estado:estadoComanda.registrado,
            direccion:"Alajuela,Zarcero",
            nota:"Barra libre Quattro Stagioni",
            subTotal:12000,
            impuesto:500,
            total:12500,
            idMesa:3,
       
    },

     //1
     {
        idUsuario:"48584516",
            estado:estadoComanda.entregada,
            direccion:"San Jose",
            nota:"Pareja TRENETTE al PESTO",
            subTotal:4000,
            impuesto:200,
            total:4200,
            idMesa:4,
       
    },
]