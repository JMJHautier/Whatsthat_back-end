import user from '../models/user.js'
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'


export const signUp = async(req, res) =>  {
   try {
   const {username, email, password, secretInfo} = req.body;
   const foundUser = await user.findOne({$or:[
      {email},
      {username}]})
   console.log(foundUser);
   if(foundUser) throw new Error('email or username is already taken');
   const hashPassword = await bcrypt.hash(password, 5)
   const {_id, username: userName} = await user.create({username, email, password: hashPassword, secretInfo})
   const token = jwt.sign({_id, userName}, process.env.JWT_SECRET);
      res.json({token})
   }catch(error){
      res.status(500).json({error: error.message})
   }
}

export const signIn = async (req, res) => {
   try {
      const {email, password} = req.body;
      const foundUser = await user.findOne({email})
      console.log(foundUser);
      if(!foundUser) throw new Error ('User does not exist');
      const match = await bcrypt.compare(password, foundUser.password);
      if(!match) throw Error ('Password is incorrect'); 
      const token = jwt.sign({_id: foundUser._id, username: foundUser.username}, process.env.JWT_SECRET);
      console.log(token);
      res.json({token})
      }catch(error){
         res.status(500).json({error: error.message})
      }

}

export const getUserInfo = async (req, res) => {
   try {
      res.send(req.user)
   }catch(error) {
      res.status(500).json({error:error.message})
   }
}

export const approvedSession = async (req, res) => {
   try {
      res.json({success: 'Valid token'});
   }catch(error) {
      res.status(500).json({error:error.message});
   }
}