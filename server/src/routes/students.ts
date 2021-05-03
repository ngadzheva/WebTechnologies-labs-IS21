import * as express from 'express';
import errorCatch from '../middleware/error-handler';
import { read, write } from '../utils/files-utils';
import { Student } from '../interfaces/student';
import StudentsMarksController from '../controllers/students-marks-controller';

const students: express.Router = express.Router();

const filePath: string = '../resources';
const filename: string = '/students.json';

let controller: StudentsMarksController;

const getStudentsMarksController = (req: express.Request, res: express.Response, next: () => void) => {
    controller = new StudentsMarksController();
    next();
};

students.use(getStudentsMarksController);

students.get('/marks', errorCatch(async (request: express.Request, response: express.Response, next: () => void) => {
    const studentsMarks: string = await read(filePath, filename);

    response.status(200).json(studentsMarks);
}));

students.post('/marks', errorCatch(async (request: express.Request, response: express.Response) => {
    /*
        {
            'firstName': 'Name',
            'lastName': 'Last name',
            'fn': 77777,
            'mark': 6
        }
    */
    const { body } = request;

    let isStudentMarkValid: boolean = controller.validateStudentMark(body);

    if (isStudentMarkValid) {
        controller.addStudentMark(body);

        await write(filePath, filename, controller.getStudentsMarks());

        response.status(200).json(body);
    } else {
        response.status(400).json({error: "Student's info is not valid."});
    }
}));

students.delete('/marks/:fn', errorCatch(async (request: express.Request, response: express.Response) => {
    const { fn } = request.params;

    let studentsMarks: string = await read(filePath, filename);
    const students: { [key: string]: Array<Student> } = JSON.parse(studentsMarks);

    const filteredStudents: Array<Student> = await students.students.filter(student => {
        student.fn !== fn;
    });

    students.students = filteredStudents;
    studentsMarks = JSON.stringify(students);

    await write(filePath, filename, studentsMarks);

    response.status(200).json(studentsMarks);
}));

export default students;