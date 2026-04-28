import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as Record<string, string>,
      });
      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
          error: "No active session found",
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
          error: "Email not verified",
        });
      }
      if (roles.length > 0 && !roles.includes(session.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
          error: "You do not have permission to access this resource",
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: (error as Error).message,
      });
    }
  };
};

export default authMiddleware;
