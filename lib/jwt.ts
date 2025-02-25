// lib/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: object, expiresIn = "1h"): string {
    return (jwt as any).sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return null;
    }
}
