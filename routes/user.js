import express from 'express'; 
import {
   getAllUsers,
   createUser,
   getSingleUser,
   updateUser
} from '../controllers/user.js'

const user = express.Router();

user.get('/', getAllUsers);
user.post('/', createUser);
user.get('/:id', getSingleUser);
user.put('/:id', updateUser);

export default user;

