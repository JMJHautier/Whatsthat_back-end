import express from 'express';
import {sendNotification} from '../controllers/mailer.js'

const mailer = express.Router(); 


mailer.post('/notify/:id', sendNotification)

export default mailer