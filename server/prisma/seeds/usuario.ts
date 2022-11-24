import {rol } from "@prisma/client";
import {sede } from "@prisma/client";
export const usuarios = [
    //1
    {
     id:"208100007",
     nombre:"Rolando",
     apellido1:"Castro",
     apellido2:"Castro",
     telefono:"84657852",
     rol:rol.administrador,
     idSede: 1,
     
    },
    //2
    {
        id:"106580358",
        nombre:"Keyner",
        apellido1:"Porras",
        apellido2:"Castro",
        telefono:"85655685",
        rol:rol.mesero,
        idSede: 1,
       },
    //3
    {
        id:"208109907",
        nombre:"Michael",
        apellido1:"Porras",
        apellido2:"Cruz",
        telefono:"122345678",
        rol:rol.cliente,
        idSede: 2,
       },
    //3
    {
        id:"48584516",
        nombre:"Fabian",
        apellido1:"Solis",
        apellido2:"Jimenez",
        telefono:"89562336",
        rol:rol.administrador,
        idSede: 3,
       },
    //3
    {
        id:"48459757",
        nombre:"Maria",
        apellido1:"Avila",
        apellido2:"Avarca",
        telefono:"95175364",
        rol:rol.mesero,
        idSede: 3,
       },
       //1
    {
        id:"96385241",
        nombre:"Kevin",
        apellido1:"Castro",
        apellido2:"Barrantes",
        telefono:"789456123",
        rol:rol.mesero,
        idSede: 4,
       },
    //1
    {
        id:"741852963",
        nombre:"Esteban",
        apellido1:"Salazar",
        apellido2:"Alvarado",
        telefono:"78936521",
        rol:rol.administrador,
        idSede: 4,
       },
       //1
    {
        id:"304570878",
        nombre:"Jefry",
        apellido1:"Dahmer",
        apellido2:"Ortiz",
        telefono:"8665565",
        rol:rol.cliente,
        idSede: 5,
       },
       //1
    {
        id:"2081000072",
        nombre:"Marta",
        apellido1:"Salgado",
        apellido2:"Flores",
        telefono:"8838382",
        rol:rol.mesero,
        idSede: 1,
       },
]