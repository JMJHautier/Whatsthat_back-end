import express from 'express'; 
import {signUp, signIn, getUserInfo} from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = express.Router(); 

authRouter.post('/signup', signUp); 
authRouter.post('/signin', signIn);
authRouter.get('/me', verifyToken, getUserInfo);

export default authRouter; 