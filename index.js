// Import necessary modules and libraries
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import controller from './src/controller/controller.js';
import path from 'path';
import { uploadFile } from './src/middlewares/fileupload.middleware.js';
import session from 'express-session';
import { auth, loginauth } from './src/middlewares/auth.js';

// Create an instance of the Express server
const server = express();

// Create an instance of the controller
const control = new controller();

// Serve static files from the 'public/' directory
server.use(express.static('public/'));

// Initialize session middleware
server.use(session({
    secret: 'secretkey',
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false },
}));

// Use EJS layouts for rendering views
server.use(ejsLayouts);

// Set the 'ejs' view engine
server.set('view engine', 'ejs');

// Set the views directory to 'src/views'
server.set('views', path.join(path.resolve(), 'src', 'views'));

// Enable parsing of URL-encoded data
server.use(express.urlencoded({ extended: true }));

// Define routes and their corresponding controller methods
server.get('/', control.index);
server.get('/jobs', control.jobs);
server.get('/jobs/:id', control.applyJobs);
server.get('/login', loginauth, control.login);
server.get('/newjob', control.postnewjob);
server.get('/logout', control.logout);
server.get('/delete/:id', auth('Allowed only by Recruiters.'), control.deleteJob);
server.get('/update/:id', auth('Allowed only by Recruiters.'), control.update);
server.get('/search', control.search);

// Handle login and registration POST requests
server.post('/login', control.getlogin);
server.post("/registerRecruiter", control.registerRecruiter);

// Handle job application and creation POST requests
server.post("/applyJobs/:id", uploadFile.single('imageUrl'), control.jobsApplied);
server.post("/newjob", control.createJob);

// Export the Express server instance
export default server;
