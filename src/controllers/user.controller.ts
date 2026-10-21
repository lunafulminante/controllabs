import type { Request, Response } from 'express';
import type { User, UserRole } from '../interfaces';
import { users } from '../data/store';

type UserState = User['estado'];
type CreateUserBody = Pick<User, 'nombre' | 'email' | 'rol' | 'estado' | 'password'>;
type UpdateUserBody = Partial<Pick<User, 'rol' | 'estado' | 'password'>>;

const userRoles: UserRole[] = ['estudiante', 'docente', 'administrador'];
const userStates: UserState[] = ['activo', 'inactivo'];
const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export const getUsers = (_req: Request, res: Response) => {
    const activeUsers = users.filter((user) => !user.deleted);
    res.json(activeUsers);
};

export const createUser = (
    req: Request<Record<string, never>, User | { message: string }, CreateUserBody>,
    res: Response<User | { message: string }>
) => {
    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const { nombre, email, rol, estado, password } = body;
    if (
        typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof password !== 'string' ||
        !password ||
        !userRoles.includes(rol as UserRole) ||
        !userStates.includes(estado as UserState) ||
        Object.keys(body).some((key) => !['nombre', 'email', 'rol', 'estado', 'password'].includes(key))
    ) {
        return res.status(400).json({ message: 'Datos de usuario inválidos' });
    }

    const newUser: User = {
        id: Date.now().toString(),
        deleted: false,
        nombre: nombre.trim(),
        email: email.trim(),
        rol: rol as UserRole,
        estado: estado as UserState,
        password,
    };
    users.push(newUser);
    return res.status(201).json(newUser);
};

export const getUserById = (req: Request<{ id: string }>, res: Response) => {
    const user = users.find((item) => item.id === req.params.id && !item.deleted);
    return user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
};

export const updateUserPartial = (
    req: Request<{ id: string }, User | { message: string }, UpdateUserBody>,
    res: Response<User | { message: string }>
) => {
    const user = users.find((item) => item.id === req.params.id && !item.deleted);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const keys = Object.keys(body);
    if (
        keys.length === 0 ||
        keys.some((key) => !['rol', 'estado', 'password'].includes(key)) ||
        ('rol' in body && !userRoles.includes(body.rol as UserRole)) ||
        ('estado' in body && !userStates.includes(body.estado as UserState)) ||
        ('password' in body && (typeof body.password !== 'string' || !body.password))
    ) {
        return res.status(400).json({ message: 'Campos de actualización de usuario inválidos' });
    }

    if ('rol' in body) user.rol = body.rol as UserRole;
    if ('estado' in body) user.estado = body.estado as UserState;
    if ('password' in body) user.password = body.password as string;
    return res.json(user);
};

export const deleteUserLogical = (req: Request<{ id: string }>, res: Response) => {
    const user = users.find((item) => item.id === req.params.id && !item.deleted);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.deleted = true;
    return res.json({ message: 'Usuario eliminado lógicamente' });
};
