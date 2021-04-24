import * as express from 'express';

import students from './students';

const routes = express.Router();

routes.use('/students', students);

export default routes;