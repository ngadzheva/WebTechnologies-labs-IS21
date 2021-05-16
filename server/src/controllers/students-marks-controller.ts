import { read, write } from '../utils/files-utils';
import { IStudent } from '../interfaces/student';
import Student from '../models/student';
import * as mongoose from 'mongoose';

const filePath: string = '../resources';
const filename: string = '/students.json';

type StudentDocument = mongoose.Document<any, { [key: string]: string | number }>;

export default class StudentsMarksController {
    constructor(){}

    public async getStudentsMarks(): Promise<StudentDocument[]> {
        // return await read(filePath, filename);
        return Student.find({});
                        // .sort({mark: -1, firstName: 1, lastName: 1})
                        // .limit(2)
                        // .select({firstName: true});
    }

    public async addStudentMark(student: IStudent): Promise<void> {
        // const students: { [key: string]: Array<IStudent> } = JSON.parse(this.studentsMarks);
    
        // students.students.push(student);

        // this.studentsMarks = JSON.stringify(students);

        const newStudent: StudentDocument = new Student({
            _id: new mongoose.Types.ObjectId(),
            ...student
        });

        await newStudent.save();
    }

    // public getStudentsMarks(): StudentDocument[] {           
    //     return this.studentsMarks;
    // }

    public async deleteStudentMark(fn: string): Promise<void>{
        await Student.findOneAndRemove({ fn });
    }

    public validateStudentMark(student: IStudent): boolean {
        let isValid: boolean = true;

        if (!student.firstName) {
            isValid = false;
        } else if (student.firstName.length > 20) {
            isValid = false;
        }

        if (!student.lastName) {
            isValid = false;
        } else if (student.lastName.length > 20) {
            isValid = false;
        }

        if (!student.fn) {
            isValid = false;
        } else if (student.fn < '77000' || student.fn > '77999') {
            isValid = false;
        }

        if (!student.mark) {
            isValid = false;
        } else if (student.mark < 2.0 || student.mark > 6.0) {
            isValid = false;
        }

        return isValid;
    }
}