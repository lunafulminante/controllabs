import type { Request, Response } from 'express';
import type { Environment } from '../interfaces';
import { environments } from '../data/store';

type CreateEnvironmentBody = Pick<Environment, 'nombre' | 'capacidad' | 'ubicacion'> &
    Partial<Pick<Environment, 'estadoOperativo'>>;
type UpdateEnvironmentBody = Partial<Pick<Environment, 'nombre' | 'capacidad' | 'ubicacion' | 'estadoOperativo'>>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export const listEnvironments = (_req: Request, res: Response) => res.json(environments);

export const createEnvironment = (
    req: Request<Record<string, never>, Environment | { message: string }, CreateEnvironmentBody>,
    res: Response<Environment | { message: string }>
) => {
    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const { nombre, capacidad, ubicacion, estadoOperativo } = body;
    if (
        typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof capacidad !== 'number' ||
        !Number.isFinite(capacidad) ||
        capacidad <= 0 ||
        typeof ubicacion !== 'string' ||
        !ubicacion.trim() ||
        ('estadoOperativo' in body && typeof estadoOperativo !== 'boolean') ||
        Object.keys(body).some((key) => !['nombre', 'capacidad', 'ubicacion', 'estadoOperativo'].includes(key))
    ) {
        return res.status(400).json({ message: 'Datos de ambiente inválidos' });
    }

    const newEnv: Environment = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        capacidad,
        ubicacion: ubicacion.trim(),
        estadoOperativo: estadoOperativo === undefined ? true : estadoOperativo as boolean,
    };
    environments.push(newEnv);
    return res.status(201).json(newEnv);
};

export const updateEnvPartial = (
    req: Request<{ id: string }, Environment | { message: string }, UpdateEnvironmentBody>,
    res: Response<Environment | { message: string }>
) => {
    const environment = environments.find((item) => item.id === req.params.id);
    if (!environment) return res.status(404).json({ message: 'Ambiente no encontrado' });

    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }

    const keys = Object.keys(body);
    if (
        keys.length === 0 ||
        keys.some((key) => !['nombre', 'capacidad', 'ubicacion', 'estadoOperativo'].includes(key)) ||
        ('nombre' in body && (typeof body.nombre !== 'string' || !body.nombre.trim())) ||
        ('capacidad' in body &&
            (typeof body.capacidad !== 'number' || !Number.isFinite(body.capacidad) || body.capacidad <= 0)) ||
        ('ubicacion' in body && (typeof body.ubicacion !== 'string' || !body.ubicacion.trim())) ||
        ('estadoOperativo' in body && typeof body.estadoOperativo !== 'boolean')
    ) {
        return res.status(400).json({ message: 'Campos de actualización de ambiente inválidos' });
    }

    if ('nombre' in body) environment.nombre = (body.nombre as string).trim();
    if ('capacidad' in body) environment.capacidad = body.capacidad as number;
    if ('ubicacion' in body) environment.ubicacion = (body.ubicacion as string).trim();
    if ('estadoOperativo' in body) environment.estadoOperativo = body.estadoOperativo as boolean;
    return res.json(environment);
};
