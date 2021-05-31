import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserController from '../controllers/user-controller';

const controller: UserController = new UserController();

const loginAuth = (request: Request, response: Response, next: () => void): void => {
    const { username, password } = request.body;

    controller.findUser(username)
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error: Error, result: boolean) => {
                    if (error) {
                        response.status(400).json({ error: error} );
                    }
                    
                    if (result) {
                        response.locals.user = user;
                        next();
                    } else {
                        response.status(401).json({ error: 'Invalid password' });
                    }
                });
            } else {
                response.status(401).json({ error: 'Invalid username.'} );
            }
        });
};

export default loginAuth;