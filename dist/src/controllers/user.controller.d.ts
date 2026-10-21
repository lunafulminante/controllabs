import type { Request, Response } from 'express';
import type { User } from '../interfaces';
type CreateUserBody = Pick<User, 'nombre' | 'email' | 'rol' | 'estado' | 'password'>;
type UpdateUserBody = Partial<Pick<User, 'rol' | 'estado' | 'password'>>;
export declare const getUsers: (_req: Request, res: Response) => void;
export declare const createUser: (req: Request<Record<string, never>, User | {
    message: string;
}, CreateUserBody>, res: Response<User | {
    message: string;
}>) => Response<User | {
    message: string;
}, Record<string, any>>;
export declare const getUserById: (req: Request<{
    id: string;
}>, res: Response) => Response<any, Record<string, any>>;
export declare const updateUserPartial: (req: Request<{
    id: string;
}, User | {
    message: string;
}, UpdateUserBody>, res: Response<User | {
    message: string;
}>) => Response<User | {
    message: string;
}, Record<string, any>>;
export declare const deleteUserLogical: (req: Request<{
    id: string;
}>, res: Response) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=user.controller.d.ts.map