
import {
    ICreateUserDTO,
    IUpdateUserDTO
} from '../dtos/user.dto';

import {
    User,
    UserFilters,
    UserRepository
} from './user.repository';

export class InMemoryUserRepository implements UserRepository {
    private readonly users = new Map<number, User>();
    private nextId = 1;

    public async create(input: ICreateUserDTO): Promise<User> {
        const user: User = {
            id: this.nextId++,
            nombre: input.nombre.trim(),
            correo: input.correo.trim().toLowerCase(),
            rol: input.rol,
            activo: true,
            createdAt: new Date().toISOString()
        };

        this.users.set(user.id, user);
        return { ...user };
    }

    public async findAll(filters: UserFilters = {}): Promise<User[]> {
        return Array.from(this.users.values())
            .filter((user) =>
                (filters.rol === undefined || user.rol === filters.rol) &&
                (filters.activo === undefined || user.activo === filters.activo)
            )
            .map((user) => ({ ...user }));
    }

    public async findById(id: number): Promise<User | null> {
        const user = this.users.get(id);
        return user ? { ...user } : null;
    }

    public async findByEmail(correo: string): Promise<User | null> {
        const normalizedEmail = correo.trim().toLowerCase();

        const user = Array.from(this.users.values()).find(
            (item) => item.correo === normalizedEmail
        );

        return user ? { ...user } : null;
    }

    public async update(
        id: number,
        input: IUpdateUserDTO
    ): Promise<User | null> {
        const user = this.users.get(id);

        if (!user) {
            return null;
        }

        const updated: User = {
            ...user,
            ...(input.nombre !== undefined && {
                nombre: input.nombre.trim()
            }),
            ...(input.correo !== undefined && {
                correo: input.correo.trim().toLowerCase()
            })
        };

        this.users.set(id, updated);
        return { ...updated };
    }

    public async updateActive(
        id: number,
        activo: boolean
    ): Promise<User | null> {
        const user = this.users.get(id);

        if (!user) {
            return null;
        }

        const updated: User = { ...user, activo };

        this.users.set(id, updated);
        return { ...updated };
    }
}
