import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import auth from '../middleware/auth';
import validateUser from '../middleware/validateUser';

const login: Router = Router();
  

login.post('/', validateUser, auth, (request: Request, response: Response) => {
    const { userName, rememberMe } = request.body;

    const sessionData = request.session;
    sessionData.user = userName;

    if (rememberMe) {
        bcrypt.hash(userName, 10, (error: Error, hash: string) => {
            // TODO: Handle error
            
            response.cookie('remember', hash, {path: '/', maxAge: 9000, httpOnly: false});

            response.set('Set-Cookie', `remeber=${hash}`);
        });
    }

    response.status(200).json({success: true});
});

export default login;