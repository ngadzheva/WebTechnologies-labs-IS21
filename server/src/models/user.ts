import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

export default User;