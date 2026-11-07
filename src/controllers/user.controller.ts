
import { Request, Response } from 'express';
import { userService } from '../container';
import { DomainError } from '../errors/domain.error';
import {
    ICreateUserDTO,
    IUpdateUserDTO,
    UserRole
} from '../dtos/user.dto';

export class UserController {
    public static createUser = async (req: Request, res: Response) => {
        try {
            const user = await userService.createUser(req.body as ICreateUserDTO);
            return res.status(201).json(user);
        } catch (error) {
            return UserController.handleError(error, res);
        }
    };

    public static getUsers = async (req: Request, res: Response) => {
        try {
            const rol = req.query.rol as UserRole | undefined;
            const activo = req.query.activo;

            const users = await userService.getUsers({
                rol,
                activo: activo === undefined ? undefined : activo === 'true'
            });

            return res.status(200).json(users);
        } catch (error) {
            return UserController.handleError(error, res);
        }
    };

    public static getUserById = async (req: Request, res: Response) => {
        try {
            const user = await userService.getUserById(Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            return UserController.handleError(error, res);
        }
    };

    public static updateUser = async (req: Request, res: Response) => {
        try {
            const user = await userService.updateUser(
                Number(req.params.id),
                req.body as IUpdateUserDTO
            );

            return res.status(200).json(user);
        } catch (error) {
            return UserController.handleError(error, res);
        }
    };

    public static updateUserActive = async (req: Request, res: Response) => {
        try {
            const activo = req.body.activo;

            if (typeof activo !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    error: 'El campo activo debe ser booleano.'
                });
            }

            const user = await userService.updateUserActive(
                Number(req.params.id),
                activo
            );

            return res.status(200).json(user);
        } catch (error) {
            return UserController.handleError(error, res);
        }
    };

    private static handleError(error: unknown, res: Response) {
        if (error instanceof DomainError) {
            const status =
                error.code === 'NOT_FOUND' ? 404 :
                    error.code === 'CONFLICT' ? 409 :
                        error.code === 'VALIDATION_ERROR' ? 400 : 500;

            return res.status(status).json({
                success: false,
                error: error.message
            });
        }

        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor.'
        });
    }
}
