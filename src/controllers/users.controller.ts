import { Request, Response } from 'express';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'estudiante' | 'docente' | 'administrador';
    status: 'activo' | 'inactivo';
}

const users: User[] = [
    {
        id: 1,
        name: 'Ana Pérez',
        email: 'ana@controllabs.com',
        role: 'estudiante',
        status: 'activo'
    },
    {
        id: 2,
        name: 'Carlos Gómez',
        email: 'carlos@controllabs.com',
        role: 'docente',
        status: 'activo'
    }
];

export const getUsers = (_req: Request, res: Response) => {
    return res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const user = users.find(
        user => user.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    return res.status(200).json(user);
};
