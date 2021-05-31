import { Model, Document, Schema, model } from 'mongoose';
import IUser from '../interfaces/user';

export interface UserDocument extends IUser, Document {

}
export interface UserModel extends Model<UserDocument> {

}

const userSchema = new Schema<UserDocument, UserModel>({
    username: {
        type: String,
        required: [true, 'User name is required field.'],
        minlength: [3, 'User name must be at least 3 characters.'],
        maxlength: [20, 'User name must be less then 20 characters.']
    },
    password: {
        type: String,
        required: [true, 'Password is required field.'],
        minlength: [5, 'Password must be at least 5 characters.'],
        maxlength: [30, 'Password must be less then 30 characters.']
    },
    email: {
        type: String,
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Email must be a valid email address.'
        }
    }
});

export const User = model('User', userSchema);
