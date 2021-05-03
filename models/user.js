import mongoose from 'mongoose'; 
const {Schema, model} = mongoose;

const userSchema = new Schema({
   name: {type:String, required: true}, 
   password: {type:String, required: true},
   email:{type:String, required: true},
   secretInfo:{type:String, required:true},
   time: {type: Date, default: Date.now}
})

export default model('user', userSchema, 'user')