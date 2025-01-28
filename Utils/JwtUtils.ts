import jwt, { Secret } from "jsonwebtoken";
import { Config } from "../Config/Config";

const ENV = process.env.NODE_ENV || "development";
const { secret, expirationTime } = Config[ENV].jwt;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secret as Secret, { expiresIn: expirationTime });
};

export const verifyToken = (token: string): object | null => {
    try {
        const decoded = jwt.verify(token, secret as Secret);

        if (typeof decoded === "object" && decoded !== null) {
            return decoded;
        }

        return null;
    } catch{
        console.error("Token inválido o expirado:");
        return null;
    }
};