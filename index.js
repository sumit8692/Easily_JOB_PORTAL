import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import controller from './src/controller/controller.js';
import path from 'path';

const server = express();

const control = new controller();

server.use(express.static('public'));
server.use(ejsLayouts);
server.use(express.static('src/views'));
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
server.use(express.urlencoded({extended: true}));


server.get('/', control.index);
server.get('/jobs', control.jobs);
server.get('/login', control.login);
server.get('/postjob', control.postjob);
export default server;