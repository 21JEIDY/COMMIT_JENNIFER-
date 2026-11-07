
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserDTO,
    UserRole
} from '../dtos/user.dto';

export interface User extends IUserDTO {
    createdAt: string;
}

export interface UserFilters {
    rol?: UserRole;
    activo?: boolean;
}

export interface UserRepository {
    create(input: ICreateUserDTO): Promise<User>;
    findAll(filters?: UserFilters): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(correo: string): Promise<User | null>;
    update(id: number, input: IUpdateUserDTO): Promise<User | null>;
    updateActive(id: number, activo: boolean): Promise<User | null>;
}
