export type UserRole = 'estudiante' | 'docente' | 'administrador';
export interface User {
    id: string;
    nombre: string;
    email: string;
    rol: UserRole;
    estado: 'activo' | 'inactivo';
    password: string;
    deleted: boolean;
}
export interface Environment {
    id: string;
    nombre: string;
    capacidad: number;
    ubicacion: string;
    estadoOperativo: boolean;
}
export interface Equipment {
    id: string;
    nombre: string;
    ambienteId: string;
    estadoTecnico: 'operativo' | 'en mantenimiento' | 'dañado';
    ubicacionEspecifica: string;
}
export type IncidentStatus = 'pendiente' | 'en proceso' | 'resuelto';
export type IncidentSeverity = 'baja' | 'media' | 'alta' | 'critica';
export interface Incident {
    id: string;
    descripcion: string;
    equipoId?: string;
    ambienteId?: string;
    severidad: IncidentSeverity;
    estado: IncidentStatus;
    fechaCreacion: string;
}
//# sourceMappingURL=index.d.ts.map