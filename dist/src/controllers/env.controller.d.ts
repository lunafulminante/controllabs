import type { Request, Response } from 'express';
import type { Environment } from '../interfaces';
type CreateEnvironmentBody = Pick<Environment, 'nombre' | 'capacidad' | 'ubicacion'> & Partial<Pick<Environment, 'estadoOperativo'>>;
type UpdateEnvironmentBody = Partial<Pick<Environment, 'nombre' | 'capacidad' | 'ubicacion' | 'estadoOperativo'>>;
export declare const listEnvironments: (_req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const createEnvironment: (req: Request<Record<string, never>, Environment | {
    message: string;
}, CreateEnvironmentBody>, res: Response<Environment | {
    message: string;
}>) => Response<Environment | {
    message: string;
}, Record<string, any>>;
export declare const updateEnvPartial: (req: Request<{
    id: string;
}, Environment | {
    message: string;
}, UpdateEnvironmentBody>, res: Response<Environment | {
    message: string;
}>) => Response<Environment | {
    message: string;
}, Record<string, any>>;
export {};
//# sourceMappingURL=env.controller.d.ts.map