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
   try {
      const {id} = req.params
      const {body, source, comment, rating_positive, rating_negative} = req.body;
      if(rating_positive) {
         const updatedGuess = await guess.findOneAndUpdate(
            {_id:id},
            {$inc:{rating_positive:1}},
            {new:true})
         res.json(updatedGuess)
      }
      else if(rating_negative) {
         const updatedGuess = await guess.findOneAndUpdate(
            {_id:id}, 
            {$inc:{rating_negative:1}},
            {new:true})
         res.json(updatedGuess)
      }
      else
      {
      const updatedGuess= await guess.findOneAndUpdate(
         {_id:id},
         {body, source, comment, rating_positive, rating_negative},
         {new:true}
      );
      res.json(updatedGuess);
      }
   }catch(error){res.status(500).json({error:error.message})}
   
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