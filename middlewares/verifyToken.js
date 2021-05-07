import jwt from 'jsonwebtoken'
import user from '../models/user.js';

const verifyToken = async  (req, res, next) => {
   try {const {token} = req.headers;
   console.log(token); 
   if(!token) throw new Error('Unauthorized')
   const {_id}= jwt.verify(token, process.env.JWT_SECRET )
   const foundUser = await (await user.findById(_id).populate("ask").populate("alert"))
   console.log(foundUser);
   if(!foundUser) throw new Error ('User does not exist')
   req.user = foundUser
   next();
}catch(error){res.status(500).json({error:error.message})}
}
export default verifyToken