
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    IUserDTO
} from '../dtos/user.dto';
import { DomainError } from '../errors/domain.error';
import {
    User,
    UserFilters,
    UserRepository
} from '../repositories/user.repository';

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    public async createUser(input: ICreateUserDTO): Promise<User> {
        const correo = input.correo.trim().toLowerCase();

        const existingUser = await this.userRepository.findByEmail(correo);

        if (existingUser) {
            throw new DomainError(
                'CONFLICT',
                'Ya existe un usuario registrado con ese correo.'
            );
        }

        return this.userRepository.create({
            ...input,
            nombre: input.nombre.trim(),
            correo
        });
    }

    public async getUsers(filters: UserFilters = {}): Promise<User[]> {
        return this.userRepository.findAll(filters);
    }

    public async getUserById(id: number): Promise<User> {
        this.validateId(id);

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new DomainError(
                'NOT_FOUND',
                `No existe un usuario con identificador ${id}.`
            );
        }

        return user;
    }

    public async updateUser(
        id: number,
        input: IUpdateUserDTO
    ): Promise<User> {
        this.validateId(id);

        if (input.correo) {
            const correo = input.correo.trim().toLowerCase();
            const existingUser = await this.userRepository.findByEmail(correo);

            if (existingUser && existingUser.id !== id) {
                throw new DomainError(
                    'CONFLICT',
                    'Ese correo ya está registrado por otro usuario.'
                );
            }

            input = { ...input, correo };
        }

        const updatedUser = await this.userRepository.update(id, input);

        if (!updatedUser) {
            throw new DomainError(
                'NOT_FOUND',
                `No existe un usuario con identificador ${id}.`
            );
        }

        return updatedUser;
    }

    public async updateUserActive(
        id: number,
        activo: boolean
    ): Promise<User> {
        this.validateId(id);

        const updatedUser = await this.userRepository.updateActive(id, activo);

        if (!updatedUser) {
            throw new DomainError(
                'NOT_FOUND',
                `No existe un usuario con identificador ${id}.`
            );
        }

        return updatedUser;
    }

    private validateId(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new DomainError(
                'VALIDATION_ERROR',
                'El identificador debe ser un entero positivo.'
            );
        }
    }
}
