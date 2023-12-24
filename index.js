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
server.get('/jobs/:id', control.applyJobs);
server.get('/login', control.login);
server.get('/newjob', control.postnewjob);
server.get('/logout', control.logout);
server.get('/delete/:id', control.deleteJob);
server.get('/update/:id', control.update);
server.get('/search', control.search);

server.post('/login', control.getlogin);
server.post("/registerRecruiter", control.registerRecruiter);

export default server;