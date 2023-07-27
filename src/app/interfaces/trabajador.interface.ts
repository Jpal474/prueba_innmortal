import { Departamento } from "./departamento.interface"

export interface Trabajador{
    id:string
    nombre:string
    apellidos:string
    dias_laborales:string
    telefono:string
    departamento?:Departamento
}