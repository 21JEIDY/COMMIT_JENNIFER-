
export type UserRole = 'ADMIN' | 'GUARDA' | 'INSTRUCTOR';

export interface ICreateUserDTO {
    nombre: string;
    correo: string;
    password: string;
    rol: UserRole;
}

export interface IUpdateUserDTO {
    nombre?: string;
    correo?: string;
    password?: string;
}

export interface IUserDTO {
    id: number;
    nombre: string;
    correo: string;
    rol: UserRole;
    activo: boolean;
}
