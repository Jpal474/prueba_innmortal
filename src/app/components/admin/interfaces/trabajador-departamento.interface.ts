import { Departamento } from "./departamento.interface";
import { Supermercado } from "./supermercado.interface";
import { Trabajador } from "./trabajador.interface";

export interface TrabajadorDepartamento{
    id:string
    nombre:string
    apellidos:string
    dias_laborales:string
    telefono:string
    departamento:Departamento;

}