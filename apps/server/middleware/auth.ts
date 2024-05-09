import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
        jwt.verify(token, "SECRET", (error, user) => {
            if (error) {
                return res.status(404).json({ msg: "Error parsing token" });
            }
            console.log(user);
            next();
        })
    } else {
        return res.status(401).json({ msg: "No token provided" });
    }
}