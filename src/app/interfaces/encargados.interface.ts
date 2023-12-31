import { Supermercado } from "./supermercado.interface";

export interface Encargado{
    id?: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string;
    genero:EncargadoGenero;
    fecha_nacimiento: string;
    correo: string;
    telefono: string;
    imagen?:string;
    contraseña: string;
    tipo?:string;
    supermercado?:Supermercado;
}



export enum EncargadoGenero{
    FEMENINO='FEMENINO',
    MASCULINO='MASCULINO'
}