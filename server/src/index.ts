import * as express from 'express';
import students from './routes/students';

const app = express();

app.use('/students', students);

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});