export class Usuario{
    _id?: number;
    nombre: string;
    apellidos: string;
    tarea: string;
    descripcion: string;
    status: boolean;

    constructor(nombre: string, apellidos: string, tarea: string, descripcion: string, status: boolean){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.tarea = tarea;
        this.descripcion = descripcion;
        this.status = status;
    }
}