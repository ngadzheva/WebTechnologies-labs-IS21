import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/user';

const auth = (request: Request, response: Response, next: () => void): void => {
    const token = request.cookies.auth;
    const JWT_KEY = process.env.JWT_KEY || '';

    if (token) {
        jwt.verify(token, JWT_KEY, (err: Error, decoded: { [key: string]: IUser }): void => {
            if (err) {
                response.status(401).json({ success: false, message: 'Session expired' });
            }

            response.locals.user = decoded.user;
            next();
        });
    } else {
        response.status(403).json({ success: false, message: 'Unauthorized' });
    }
};

export default auth;