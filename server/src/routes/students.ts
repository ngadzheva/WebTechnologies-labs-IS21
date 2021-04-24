import * as express from 'express';
import catchError from '../middleware/error-handler';
import { read, write } from '../utils/files-utils';
import { Student } from '../interfaces/student';
import StudentsMarksController from '../controllers/students-marks-controller';

const students: express.Router = express.Router();

const filePath: string = '../resources';
const filename: string = '/students.json';

students.get('/marks', catchError(async (request: express.Request, response: express.Response) => {
    try {
        const studentsMarks: string = await read(filePath, filename);
    
        response.status(200).json(studentsMarks);
    } catch(error) {
        response.status(404).json(error);
    }
}));

students.post('/marks', catchError(async (request: express.Request, response: express.Response) => {
    /*
        {
            'firstName': 'Name',
            'lastName': 'Last name',
            'fn': 77777,
            'mark': 6
        }
    */
    const { body } = request;

    let studentsMarks: StudentsMarksController = new StudentsMarksController();
    let isStudentMarkValid: boolean = studentsMarks.validateStudentMark(body);

    if (isStudentMarkValid) {
        studentsMarks.addStudentMark(body);

        await write(filePath, filename, studentsMarks.getStudentsMarks());

        response.status(200).json(body);
    } else {
        response.status(400).json({error: "Student's info is not valid."});
    }
}));

students.delete('/marks/:fn', catchError(async (request: express.Request, response: express.Response) => {
    const { fn } = request.params;

    let studentsMarks: string = await read(filePath, filename);
    const students: { [key: string]: Array<Student> } = JSON.parse(studentsMarks);

    // search student by fn
    // delete student
    // update studentsMarks
    // update file
    // send response

    const filteredStudents: Array<Student> = await students.students.filter(student => {
        student.fn !== fn;
    });

    students.students = filteredStudents;
    studentsMarks = JSON.stringify(students);

    await write(filePath, filename, studentsMarks);

    response.status(200).json(studentsMarks);
}));

export default students;