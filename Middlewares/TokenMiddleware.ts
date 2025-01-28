import { ContextFunction } from '@apollo/server';
import { Request, Response } from 'express';
import { BaseContext } from '@apollo/server/dist/esm/externalTypes';

export interface CustomContext extends BaseContext {
    headers: Record<string, string | undefined>;
    setToken: (token: string) => void;
}

const normalizeHeaders = (headers: Request['headers']): Record<string, string | undefined> => {
    const normalizedHeaders: Record<string, string | undefined> = {};
    
    for (const [key, value] of Object.entries(headers)) 
        normalizedHeaders[key] = Array.isArray(value) ? value.join(', ') : value;

    return normalizedHeaders;
};

export const TokenMiddleware: ContextFunction<[any], CustomContext> = async ({ req, res }) => {
    const setToken = (token: string) => {
        res.setHeader('Authorization', `Bearer ${token}`);
    };

    return Promise.resolve({
        headers: normalizeHeaders(req.headers),
        setToken,
    });
};