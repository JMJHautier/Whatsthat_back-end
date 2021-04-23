import express from 'express';

import {
   getAllAsks, 
   getSingleAsk,
   createAsk, 
   updateAsk
} from '../controllers/ask.js';

const ask = express.Router()

ask.get('/', getAllAsks);
ask.get('/:id', getSingleAsk);
ask.post('/', createAsk);
ask.put('/:id', updateAsk);

export default ask;
