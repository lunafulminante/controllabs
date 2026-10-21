"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserLogical = exports.updateUserPartial = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const store_1 = require("../data/store");
const userRoles = ['estudiante', 'docente', 'administrador'];
const userStates = ['activo', 'inactivo'];
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const getUsers = (_req, res) => {
    const activeUsers = store_1.users.filter((user) => !user.deleted);
    res.json(activeUsers);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const { nombre, email, rol, estado, password } = body;
    if (typeof nombre !== 'string' ||
        !nombre.trim() ||
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        typeof password !== 'string' ||
        !password ||
        !userRoles.includes(rol) ||
        !userStates.includes(estado) ||
        Object.keys(body).some((key) => !['nombre', 'email', 'rol', 'estado', 'password'].includes(key))) {
        return res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
    const newUser = {
        id: Date.now().toString(),
        deleted: false,
        nombre: nombre.trim(),
        email: email.trim(),
        rol: rol,
        estado: estado,
        password,
    };
    store_1.users.push(newUser);
    return res.status(201).json(newUser);
};
exports.createUser = createUser;
const getUserById = (req, res) => {
    const user = store_1.users.find((item) => item.id === req.params.id && !item.deleted);
    return user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
};
exports.getUserById = getUserById;
const updateUserPartial = (req, res) => {
    const user = store_1.users.find((item) => item.id === req.params.id && !item.deleted);
    if (!user)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    const body = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un objeto' });
    }
    const keys = Object.keys(body);
    if (keys.length === 0 ||
        keys.some((key) => !['rol', 'estado', 'password'].includes(key)) ||
        ('rol' in body && !userRoles.includes(body.rol)) ||
        ('estado' in body && !userStates.includes(body.estado)) ||
        ('password' in body && (typeof body.password !== 'string' || !body.password))) {
        return res.status(400).json({ message: 'Campos de actualización de usuario inválidos' });
    }
    if ('rol' in body)
        user.rol = body.rol;
    if ('estado' in body)
        user.estado = body.estado;
    if ('password' in body)
        user.password = body.password;
    return res.json(user);
};
exports.updateUserPartial = updateUserPartial;
const deleteUserLogical = (req, res) => {
    const user = store_1.users.find((item) => item.id === req.params.id && !item.deleted);
    if (!user)
        return res.status(404).json({ message: 'Usuario no encontrado' });
    user.deleted = true;
    return res.json({ message: 'Usuario eliminado lógicamente' });
};
exports.deleteUserLogical = deleteUserLogical;
//# sourceMappingURL=user.controller.js.map