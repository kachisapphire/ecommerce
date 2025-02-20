import { Request, Response, NextFunction } from "express";
import { Role } from "../enums/userEnums";
import { User } from "../entities/userEntities";
import { AppDataSource } from "../config/datasource";
const jwt = require("jsonwebtoken");
interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authorize = (roles: Role[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        const userRole = req.user.role.toUpperCase();

        if (!roles.map(r => r.toUpperCase()).includes(userRole)){
            res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            return;
        }

        next(); // ✅ Call next() to proceed if authorization is successful
    };
};
export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, "Kachi5599") as {
            userId: number;
        };

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.userId } });

        if (!user) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return;
        }

        req.user = user;
        next(); // ✅ Pass control to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};;
