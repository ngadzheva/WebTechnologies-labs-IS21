import * as express from 'express';
import { read, write } from '../utils/files-utils';

const students: express.Router = express.Router();

const filePath: string = '../resources';
const filename: string = '/students.json';

students.get('/marks', async (request: express.Request, response: express.Response) => {
    const studentsMarks: string = await read(filePath, filename);

    response.json(studentsMarks);
});

students.post('/marks', async (request: express.Request, response: express.Response) => {
    const { body } = request;

    /*
        {
            'firstName': 'Name',
            'lastName': 'Last name',
            'fn': 77777,
            'mark': 6
        }
    */

    let studentsMarks: string = await read(filePath, filename);
    const students: { [key: string]: Array< { [key: string]: string | number }> } = JSON.parse(studentsMarks);
    
    students.students.push(body);

    studentsMarks = JSON.stringify(students);

    await write(filePath, filename, studentsMarks);

    response.json(studentsMarks);
});

students.delete('/marks/:fn', async (request: express.Request, response: express.Response) => {
    const { fn } = request.params;

    let studentsMarks: string = await read(filePath, filename);
    const students: { [key: string]: Array< { [key: string]: string | number }> } = JSON.parse(studentsMarks);

    // search student by fn
    // delete student
    // update studentsMarks
    // update file
    // send response

    const filteredStudents: Array< { [key: string]: string | number }> = await students.students.filter(student => {
        student.fn !== fn;
    });

    students.students = filteredStudents;
    studentsMarks = JSON.stringify(students);

    await write(filePath, filename, studentsMarks);

    response.json(studentsMarks);
});

export default students;