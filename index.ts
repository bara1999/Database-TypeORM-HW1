import './config.js';
import express from 'express';
import userRouter from './routers/user.js'
import "reflect-metadata";
import db from './db/index.js';

const app = express();//consturctor
const port=3000;

app.use(express.json());


app.get('/', (req, res) =>{
    res.send("Hello");
});

app.use('/user',userRouter);
app.use((req, res) =>{
    res.status(404).send("NotFound");
})//اي ريكويست يعني رابط مش موجود اصلا عندي بصير يعطيني هيك
//http://localhost:3000/ta

app.listen(port,()=>{
console.log(` the app run on ${port}`);
db.initialize();
});

