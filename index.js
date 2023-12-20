import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import controller from './src/controller/controller.js';
import path from 'path';

const server = express();

const control = new controller();

server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);
server.use(express.urlencoded({extended: true}));

server.get('/', control.index);

export default server;