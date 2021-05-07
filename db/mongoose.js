import mongoose from 'mongoose';
import 'dotenv/config.js'

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });