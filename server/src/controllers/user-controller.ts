import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import IUser from '../interfaces/user';
import { read, write } from '../utils/files-utils';
import { UserDocument, User } from '../models/user';

const filePath: string = '../resources';
const filename: string = '/users.json';

class UserController {
    construct() {} 

    public async createUser(user: IUser): Promise<void> {
        bcrypt.hash(user.password, 10, async (error: Error, hash: string) => {
            if (error) {
                return;
            }

            user.password = hash;

            // const usersObject: { [users: string]: IUser[] } = await this.readUsers();
            // usersObject.users.push(user);

            // await write(filePath, filename, JSON.stringify(usersObject));

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: user.username,
                password: user.password, 
                email: user.email
            });

            await newUser.save();
        });
    }

    public async findUser(user: string): Promise<UserDocument> {
        // const usersObject: { [users: string]: IUser[] } = await this.readUsers();

        // return usersObject.users.filter((currUser: IUser) => currUser.userName === user);

        return User.findOne({ username: user }).exec();
    }

    private async readUsers(): Promise<{ [users: string]: IUser[] }> {
        const users: string = await read(filePath, filename);
        const usersObject: { [users: string]: IUser[] } = JSON.parse(users);

        return usersObject;
    }

    public validateUser(user: IUser, confirmPassword: string): string[] {
        const errors: string[] = [];

        if (!user.username) {
            errors.push('Please input user name');
        } else if (user.username.length > 20) {
            errors.push('User name must be with maximum 20 symbols');
        }

        if (!user.password) {
            errors.push('Please input password');
        } else if (!user.password.match(/[a-zA-z0-9]?/)) {
            errors.push('Password must contain letters and digits');
        } else if (user.password.length < 5) {
            errors.push('Password must be longer than 5 symbols');
        } else if (confirmPassword && user.password !== confirmPassword) {
            errors.push('Passwords must match.');
        }

        return errors;
    }
}

export default UserController;