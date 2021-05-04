import express from 'express'; 
import {signUp, signIn, getUserInfo, approvedSession} from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = express.Router(); 

authRouter.post('/signup', signUp); 
authRouter.post('/signin', signIn);
authRouter.get('/me', verifyToken, getUserInfo);
authRouter.get('/verify-session', verifyToken, approvedSession);
export default authRouter; 