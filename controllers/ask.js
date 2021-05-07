import ask from '../models/ask.js'
import guess from '../routes/guess.js';
import user from '../models/user.js'
export const getAllAsks = async (req, res) => {
   try{
      const allAsks = await ask.find();
      res.json(allAsks);
}catch(error) {{error: error.message}}
}

export const getSingleAsk = async (req, res)=> {
   try {
      const {id}= req.params;
      const singleAsk = await ask.findById(id);
      if(!singleAsk){res.status(404).json({message: `No Submission with id ${id}`})}
      else { res.json(singleAsk)};
   } catch (error) {{error: error.message}}
}
export const createAsk = async (req, res)=> {
   try {
      const {body, language, whatsthat, author} = req.body
      const newAsk = await ask.create({
         body,
         language,
         whatsthat,
         author      })
      
      const updateUser =  await user.findOneAndUpdate({
         _id: author},
         {$push: {ask: newAsk["_id"]}},
         {new:true})
         res.status(201).json({newAsk: newAsk, updateUser: updateUser});
   } catch(error) {
      res.status(500).json({error:error.message})
   }

}

export const updateAsk = async (req, res)=> {


}

export const deleteAsk = async (req, res) => {

}

export const getAskByGuess = async (req, res) => {
   try {
      const {body} = req.params;
      console.log(body);
      const askByGuess = await ask.aggregate([{
         $unwind: "$guess"
       },
       {
         $lookup: {
           from: "guess",
           localField: "guess",
           foreignField: "_id",
           as: "guess"
         }
       },
       {
         $match: {
           "guess.body": body
         }
       
       }])

      res.status(200).json(askByGuess)
   }catch(error){res.status(500).json({error: error.message})}
}