import { Router, Request, Response } from 'express';
import validateUser from '../middleware/validateUser';
import UsersController from '../controllers/user-controller';
import errorCatch from '../middleware/error-handler';

const register: Router = Router();

let controller: UsersController;

const getUsersController = (req: Request, res: Response, next: () => void) => {
    controller = new UsersController();
    next();
};

register.use(getUsersController);
  
register.post('/', validateUser, errorCatch(async (request: Request, response: Response) => {
    const userExist = await controller.findUser(request.body.username);

    if (userExist) {
        response.status(400).json({ success: false, error: 'Username is already taken' });
    } else {
        controller.createUser(request.body).catch(error => console.log(error));
    
        response.status(200).json({success: true});
    }
}));

export default register;