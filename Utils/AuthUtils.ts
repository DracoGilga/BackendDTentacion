import jwt from 'jsonwebtoken';
import { Config } from '../Config/Config';
import { GraphQLError } from 'graphql';
import { CustomContext } from '../Middlewares/TokenMiddleware';

interface JwtPayload {
    id: string;
    role: string;
}

export const validateToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, Config.development.jwt.secret) as JwtPayload;
        return decoded.role ? decoded : null;
    } catch {
        return null;
    }
};

export const authorizeRoles = (context: CustomContext, allowedRoles: string[]): JwtPayload => {
    const authHeader = context.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) 
        throw new GraphQLError('Token not provided');

    const token = authHeader.split(' ')[1];
    const decoded = validateToken(token);

    if (!decoded) 
        throw new GraphQLError('Invalid token');

    if (!allowedRoles.includes(decoded.role)) 
        throw new GraphQLError('Access denied: You do not have permissions for this action');

    return decoded;
};