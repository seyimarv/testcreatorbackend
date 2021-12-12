import express from 'express';
import { Request, Response } from 'express';
import { handleError } from './controllers/error';

const bodyParser = require('body-parser')  //import body-parser

const mongoose = require('mongoose') //importing mongoose

const authRoutes = require('./routes/auth');  //needed to register the route


const app = express();

app.use(bodyParser.json()); // this is the bodyparser method which is used to parse json i.e application/json

app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});  //used to solve the Cors Error to allow client(frontend) and server(backend) run on different domains

app.use('/auth', authRoutes) // /feed is added to filter rewuests that start with 'auh'


app.use(handleError)

mongoose.connect('mongodb+srv://Marvelous:Tomilayo1@cluster0.yopfs.mongodb.net/testcreator')
.then((result: any) => {
   app.listen(8081)
}).catch((err: any) => {
    console.log(err)
})//establish a mongoose connection
