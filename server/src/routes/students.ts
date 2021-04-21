import * as express from 'express';
import { read, write } from '../utils/files-utils';
import { Student } from '../interfaces/student';

const students: express.Router = express.Router();

const filePath: string = '../resources';
const filename: string = '/students.json';

students.get('/marks', async (request: express.Request, response: express.Response) => {
    const studentsMarks: string = await read(filePath, filename);

    response.status(200).json(studentsMarks);
});

students.post('/marks', async (request: express.Request, response: express.Response) => {
    /*
        {
            'firstName': 'Name',
            'lastName': 'Last name',
            'fn': 77777,
            'mark': 6
        }
    */
    const { body } = request;

    let studentsMarks: string = await read(filePath, filename);
    const students: { [key: string]: Array< { [key: string]: string | number }> } = JSON.parse(studentsMarks);
    
    students.students.push(body);

    studentsMarks = JSON.stringify(students);

    await write(filePath, filename, studentsMarks);

    response.status(200).json(body);
});

students.delete('/marks/:fn', async (request: express.Request, response: express.Response) => {
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
});

export default students;