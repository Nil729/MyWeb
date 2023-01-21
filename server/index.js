import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import methodOverride from "method-override"; 

//import apiClient  from 'E:/Projectes/webmanager/Client/src/http-coomon';
//import bodyParser from 'body-parser'
//import db from './config/db.config';
//import cookieParser from 'cookie-parser';
//import db from "config/db.config.js";
import engines from 'consolidate';
import path from 'path'
import webmanagerRoutes from './routes/webmanager.routes.js';
// import userRoutes from './routes/session.routes.js';
import {fileURLToPath} from 'url';

//Setings

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});

// Global variables

//app.use(cookieParser());
//app.use(flash());

// Midelwares
const corsOptions = {};
app.use(cors({corsOptions}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.engine('html', engines.ejs);

//app.use(express.static(path.join(__dirname + './Client/public')));


//app.use(apiClient())

// Main Routes
app.use('/user/webmanager', webmanagerRoutes);
// app.use('/user', userRoutes);




// Static files


// ------------
export default app;