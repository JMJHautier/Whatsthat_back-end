import guess from '../models/guess.js';
import ask from '../models/ask.js';
import nodefetch from "node-fetch";

export const getAllGuesses = async (req, res) => {
   try {
   const allGuess = await guess.find().populate('ask')
   res.json(allGuess);
   } catch(error) {res.status(500).json({error:error.message})}
}

export const getSingleGuess = async (req, res) => {

}

export const createGuess = async (req, res) => {
   try {
      const {body, source, comment, author} = req.body
      const newGuess = await guess.create({
         body,
         source,
         comment,
         ask: req.body.ask,
         author
      })
      const fullAsk = await ask.findById(req.body.ask);

      const updateAsk = await ask.findOneAndUpdate({
         _id: req.body.ask},
         {$push: {guess: newGuess["_id"]}},
         {new:true})

      const mailInfo = {
         userid: fullAsk.alert,
         hyperlink: "I am an hyperlink"
      }
      console.log(mailInfo)
      const serverLink = process.env.ORIGIN_BACK || "http://localhost:3001";
      
      const options = {
            method: 'POST',
            body: JSON.stringify(mailInfo),
            headers: {
              'Content-Type': 'application/json'
            }
          }
      const sendMail = await nodefetch(`${serverLink}/mailer/notify/${req.body.ask}`, options)
      const confirmation = console.log(sendMail)
      res.status(201).json({newGuess: newGuess, updatedAsk: updateAsk});
         
   } catch(error) {
      res.status(500).json({error:error.message})
   }
}

export const deleteGuess = async (req, res) => {

}

export const updateGuess = async (req, res) => {
   try {
      const {id} = req.params
      const {body, source, comment, rating_positive, rating_negative, isVerified} = req.body;
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
      else if(isVerified){
         const updatedGuess = await guess.findOneAndUpdate(
            {_id:id},
            {isVerified: isVerified},
            {new:true}
         )
         res.json(updatedGuess);
      }
      else{
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
   const guessByAsk = await guess.find({ask: id})
   if(!guessByAsk){res.status(404).json({message: `No Submission with id ${id}`})}
   else {res.json(guessByAsk)}
   }catch(error) {
      res.status(500).json({error:error.message})
   }
}
