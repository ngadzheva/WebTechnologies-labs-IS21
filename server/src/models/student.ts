import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required field.'],
        maxlength:  [20, 'First Name must be less than 20 characters.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required field.'],
        maxlength:  [20, 'Last Name must be less than 20 characters.']
    },
    fn: {
        type: String,
        required: [true, 'Faculty Number is required field.'],
        validate: {
            validator: (value) => /\d{5}/.test(value),
            message: 'Faculty Number must be 5-digits number.'
        }
    },
    mark: {
        type: Number,
        min: [2, 'Mark must be at least 2.'],
        max: [6, 'Mark must be not longer than 6.']
    }
});

const Student = mongoose.model('Student', studentSchema);

export { studentSchema };

export default Student;