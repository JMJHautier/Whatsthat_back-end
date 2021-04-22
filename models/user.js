import mongoose from 'mongoose'; 
const {Schema, model} = mongoose;

const userSchema = new Schema({
   username: {type:String, required: true}, 
   password: {type:String, required: true},
   email:{type:String, required: true},
   time: {type: Date, default: Date.now}
}, {collection:'user'})

export default model('user', userSchema, 'user')