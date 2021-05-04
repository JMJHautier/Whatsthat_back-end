import mongoose from 'mongoose'; 
const {Schema, model} = mongoose;

const userSchema = new Schema({
   username: {type:String, required: true}, 
   password: {type:String, required: true},
   email:{type:String, required: true},
   secretInfo:{type:String, required:false},
   time: {type: Date, default: Date.now}
})

export default model('user', userSchema, 'user')