"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnvPartial = exports.createEnvironment = exports.listEnvironments = void 0;
const store_1 = require("../data/store");
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const listEnvironments = (_req, res) => res.json(store_1.environments);
exports.listEnvironments = listEnvironments;
const createEnvironment = (req, res) => {
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const { nombre, capacidad, ubicacion, estadoOperativo } = body;
    if (typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof capacidad !== 'number' ||
        !Number.isFinite(capacidad) ||
        capacidad <= 0 ||
        typeof ubicacion !== 'string' ||
        !ubicacion.trim() ||
        ('estadoOperativo' in body && typeof estadoOperativo !== 'boolean') ||
        Object.keys(body).some((key) => !['nombre', 'capacidad', 'ubicacion', 'estadoOperativo'].includes(key))) {
        return res.status(400).json({ message: 'Datos de ambiente inválidos' });
    }
    const newEnv = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        capacidad,
        ubicacion: ubicacion.trim(),
        estadoOperativo: estadoOperativo === undefined ? true : estadoOperativo,
    };
    store_1.environments.push(newEnv);
    return res.status(201).json(newEnv);
};
exports.createEnvironment = createEnvironment;
const updateEnvPartial = (req, res) => {
    const environment = store_1.environments.find((item) => item.id === req.params.id);
    if (!environment)
        return res.status(404).json({ message: 'Ambiente no encontrado' });
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const keys = Object.keys(body);
    if (keys.length === 0 ||
        keys.some((key) => !['nombre', 'capacidad', 'ubicacion', 'estadoOperativo'].includes(key)) ||
        ('nombre' in body && (typeof body.nombre !== 'string' || !body.nombre.trim())) ||
        ('capacidad' in body &&
            (typeof body.capacidad !== 'number' || !Number.isFinite(body.capacidad) || body.capacidad <= 0)) ||
        ('ubicacion' in body && (typeof body.ubicacion !== 'string' || !body.ubicacion.trim())) ||
        ('estadoOperativo' in body && typeof body.estadoOperativo !== 'boolean')) {
        return res.status(400).json({ message: 'Campos de actualización de ambiente inválidos' });
    }
    if ('nombre' in body)
        environment.nombre = body.nombre.trim();
    if ('capacidad' in body)
        environment.capacidad = body.capacidad;
    if ('ubicacion' in body)
        environment.ubicacion = body.ubicacion.trim();
    if ('estadoOperativo' in body)
        environment.estadoOperativo = body.estadoOperativo;
    return res.json(environment);
};
exports.updateEnvPartial = updateEnvPartial;
//# sourceMappingURL=env.controller.js.map