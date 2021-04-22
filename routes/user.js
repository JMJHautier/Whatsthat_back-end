import express from 'express'; 
import {
   getAllUsers,
   createUser
} from '../controllers/user.js'

const user = express.Router();

user.get('/', getAllUsers);
user.post('/', createUser);

export default user;

