import express from 'express';

import {
   getAllAsks, 
   getSingleAsk,
   createAsk, 
   updateAsk,
   getAskByGuess
} from '../controllers/ask.js';

const ask = express.Router()

ask.get('/', getAllAsks);
ask.get('/:id', getSingleAsk);
ask.get('/guess/:body', getAskByGuess)
ask.post('/', createAsk);
ask.put('/:id', updateAsk);

export default ask;
