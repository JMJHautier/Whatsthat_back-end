import user from "../models/user.js"

export const getAllUsers = async (req, res) => {
   try {
      const users = await user.find(); 
      res.json(users); 
   }
   catch(error) {res.status(500).json({error: error.message});
}
}

export const getSingleUser = async (req, res) => {
   try {
      const {id} =  req.params;
      const singleUser = await user.findById(id)
      if(!user) { res.status(404).json({message:`User with id ${id} not found`})}
      else {
         res.json(singleUser)
      }
   } catch (error) { res.status(500).json({error: error.message})}
}

export const createUser = async (req, res) => {
   try {
      const {username, password, email} = req.body
      const newUser = await user.create({
         username,
         password,
         email      })
      res.status(201).json(newUser);
   } catch(error) {
      res.status(500).json({error:error.message})
   }
}

export const updateUser = async (req, res) => {
   try {
      const {id} = req.params; 
      const {username, password, email} = req.body;
      const updatedUser = await user.findOneAndUpdate(
         {_id: id},
         {username, password, email},
         {new: true}
      );
      res.json(updatedUser);
   }
   catch(error) {res.status(500).json({error: error.message})
                  }

}