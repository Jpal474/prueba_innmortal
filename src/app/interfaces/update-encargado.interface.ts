import { EncargadoGenero } from "./encargados.interface";

export interface UpdateEncargado{
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
        genero:EncargadoGenero;
        fecha_nacimiento: Date;
        correo: string;
        telefono: string;
        contraseña?: string;
        confirmar_contraseña?:string;
    }
    