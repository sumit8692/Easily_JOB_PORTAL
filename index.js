import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import controller from './src/controller/controller.js';
import path from 'path';
import { uploadFile } from './src/middlewares/fileupload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.js';

const server = express();

const control = new controller();

server.use(express.static('public/'));
// server.use(express.static('src/views'));
server.use(session({
    secret: 'secretkey',
    resave: false, 
    saveUninitialized: true, 
    cookie: {secure: false},
}))
server.use(ejsLayouts);
server.use(express.static('src/views'));
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
server.use(express.urlencoded({extended: true}));


server.get('/', control.index);
server.get('/jobs', control.jobs);
server.get('/jobs/:id', control.applyJobs);
server.get('/login',control.login);
server.get('/newjob', auth('Login as a Recruiter to post new job.'), control.postnewjob);
server.get('/logout', control.logout);
server.get('/delete/:id', auth('Allowed only by Recruiters.'), control.deleteJob);
server.get('/update/:id',  auth('Allowed only by Recruiters.'), control.update);
server.get('/search', control.search);

server.post('/login', control.getlogin);
server.post("/registerRecruiter", control.registerRecruiter);
server.post("/applyJobs/:id", uploadFile.single('imageUrl'), control.jobsApplied);
server.post("/newjob", control.createJob);

export default server;
