import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        fullName: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

export {};
