import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user.js';
import 'dotenv/config.js';
import './db/mongoose.js'

const app = express();
const port = process.env.PORT || 3001;
const CORSoption = { origin: process.env.ORIGIN || "http://locahost:3000" };

app.use(cors(CORSoption));
app.use(express.json());
app.use(morgan('dev'));


app.use('/user', userRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`))