
import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../dtos/user.dto';

const isCreateUserDTO = (value: unknown): value is ICreateUserDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const user = value as Record<string, unknown>;

    const allowedRoles = ['ADMIN', 'GUARDA', 'INSTRUCTOR'];

    return (
        typeof user.nombre === 'string' &&
        user.nombre.trim() !== '' &&
        typeof user.correo === 'string' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.correo.trim()) &&
        typeof user.password === 'string' &&
        user.password.length >= 8 &&
        typeof user.rol === 'string' &&
        allowedRoles.includes(user.rol)
    );
};

export const validateUserPayload = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;

    if (!isCreateUserDTO(body)) {
        res.status(400).json({
            success: false,
            error: 'Datos del usuario inválidos.'
        });
        return;
    }

    next();
};
