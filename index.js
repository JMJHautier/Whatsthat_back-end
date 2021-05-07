import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user.js';
import askRouter from './routes/ask.js'; 
import guessRouter from './routes/guess.js';
import authRouter from './routes/auth.js';
import mailRouter from './routes/mailer.js'

import 'dotenv/config.js';
import './db/mongoose.js'

const app = express();
const port = process.env.PORT || 3001;
const CORSoption = { origin: process.env.ORIGIN_FRONT || "http://localhost:3000" };

app.use(cors(CORSoption));
app.use(express.json());
app.use(morgan('dev'));


app.use('/user', userRouter); 
app.use('/ask', askRouter);
app.use('/guess', guessRouter);
app.use('/auth', authRouter);
app.use('/mailer', mailRouter);
app.listen(port, () => console.log(`Listening on port ${port}`))