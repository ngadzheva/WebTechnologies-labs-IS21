import { read, write } from '../utils/files-utils';
import { Student } from '../interfaces/student';

const filePath: string = '../resources';
const filename: string = '/students.json';

export default class StudentsMarksController {
    private studentsMarks: string;

    constructor() {
        this.readStudentsMarks().then((result: string) => this.studentsMarks = result);
    }

    private async readStudentsMarks(): Promise<string> {
        return await read(filePath, filename);
    }

    public addStudentMark(student: Student): void {
        const students: { [key: string]: Array<Student> } = JSON.parse(this.studentsMarks);
    
        students.students.push(student);

        this.studentsMarks = JSON.stringify(students);
    }

    public getStudentsMarks(): string {
        return this.studentsMarks;
    }

    public validateStudentMark(student: Student): boolean {
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