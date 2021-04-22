import user from "../models/user.js"

export const getAllUsers = async (req, res) => {
   try {
      const users = await user.find(); 
      res.json(users); 
   }
   catch(error) {res.status(500).json({error: error.message});
}
}

export const createUser = async (req, res) => {
   try {
      const newUser = await user.create({
         username,
         password,
         email,
         time
      })
      res.status(201).json(newUser);
   } catch(error) {
      res.status(500).json({error:error.message})
   }
}

