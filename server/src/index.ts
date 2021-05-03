import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import * as session from 'express-session';
import * as memcached from 'connect-memcached';
import * as cookieParser from 'cookie-parser';

import routes from './routes/index';

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: string },
        views: { [key: string]: number }
    }
};

const app = express();

const MemcachedStore = memcached(session);

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MEMCACHED_PORT = process.env.MEMCACHED_PORT || 11211;
const MEMCACHED_HOST = process.env.MEMCACHED_HOST || '127.0.0.1';

dotenv.config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

/**
 * Конфикурация на cookieParser за работа с cookies.
 */
app.use(cookieParser());

/**
 * 
 * Конфигурация на middleware за настройка на сесията.
 *  - Генериране на уникален ID на сесия.
 *  - Обикновено за стойност на secret се използва случайно
 * генериран низ, който се съхранява в environment променлива
 * 
 */
app.use(session({
    genid: (request: express.Request) => {
        console.log('Inside the session middleware');
        console.log(request.sessionID);
        return uuid;
    },
    secret: process.env.SESSION_SECRET,
    proxy: true,
    resave: false,
    saveUninitialized: true,
    store: new MemcachedStore({
        hosts: [`${MEMCACHED_HOST}:${MEMCACHED_PORT}`], // //this should be where your Memcached server is running
        secret: process.env.MEMCACHED_SECRET // // Optionally use transparent encryption for memcache session data 
    })
}));

app.use(routes);

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});
