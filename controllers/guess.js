import guess from '../models/guess.js';
import mongoose from 'mongoose'
export const getAllGuesses = async (req, res) => {
   const allGuess = await guess.find().populate('ask')
   res.json(allGuess);

}

export const getSingleGuess = async (req, res) => {

}

export const createGuess = async (req, res) => {
   try {
      const {body, source, comment, ask_id} = req.body
      const newGuess = await guess.create({
         body,
         source,
         comment,
         ask_id
      })
      
      res.status(201).json(newGuess);
   } catch(error) {
      res.status(500).json({error:error.message})
   }
}

export const deleteGuess = async (req, res) => {

}

export const updateGuess = async (req, res) => {
   
}

export const getGuessesByAsk = async(req, res) => {
   try {
   const {id} = req.params;
   console.log(id);
   const guessByAsk = await guess.find({ask_id: id})
   if(!guessByAsk){res.status(404).json({message: `No Submission with id ${id}`})}
   else {res.json(guessByAsk)}
   }catch(error) {
      res.status(500).json({error:error.message})
   }
}