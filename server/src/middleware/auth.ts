import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserController from '../controllers/user-controller';
import IUser from '../interfaces/user';

const controller: UserController = new UserController();

const auth = (request: Request, response: Response, next: () => void): void => {
    const { userName, password } = request.body;

    controller.findUser(userName)
        .then((user: IUser[]) => {
            if (user && user.length === 1) {
                bcrypt.compare(password, user[0].password, (error: Error, result: boolean) => {
                    if (error) {
                        response.status(400).json({error});
                    }
                    
                    if (result) {
                        next();
                    } else {
                        response.status(401).json({ error: 'Unauthorized' });
                    }
                });
            }
        });
}

export default auth;