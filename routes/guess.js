import express from 'express'; 
import {
   getAllGuesses, 
   getSingleGuess,
   createGuess,
   updateGuess, 
   deleteGuess
} from '../controllers/guess.js';


const guess = express.Router(); 

guess.get('/', getAllGuesses);
guess.get('/:id', getSingleGuess); 
guess.post('/', createGuess);
guess.put('/', updateGuess); 
guess.delete('/', deleteGuess);

export default guess;
