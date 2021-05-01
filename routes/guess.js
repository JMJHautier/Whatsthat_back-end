import express from 'express'; 
import {
   getAllGuesses, 
   getSingleGuess,
   createGuess,
   updateGuess, 
   deleteGuess,
   getGuessesByAsk
} from '../controllers/guess.js';


const guess = express.Router(); 

guess.get('/', getAllGuesses);
guess.get('/:id', getSingleGuess); 
guess.post('/', createGuess);
guess.put('/', updateGuess); 
guess.delete('/', deleteGuess);
guess.get('/ask/:id', getGuessesByAsk)
export default guess;
