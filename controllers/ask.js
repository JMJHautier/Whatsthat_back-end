import ask from '../models/ask.js'

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
      if(!singleAsk){res.status(404).json({message: `Submission with id ${id}`})}
      else { res.json(singleAsk)};
   } catch (error) {{error: error.message}}
}

export const createAsk = async (req, res)=> {
   try {
      const {body, language, whatsthat} = req.body
      const newAsk = await ask.create({
         body,
         language,
         whatsthat      })
      res.status(201).json(newAsk);
   } catch(error) {
      res.status(500).json({error:error.message})
   }

}

export const updateAsk = async (req, res)=> {

}

export const deleteAsk = async (req, res) => {

}

