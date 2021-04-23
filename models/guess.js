import mongoose from 'mongoose'; 
const {Schema, model} = mongoose; 

const guessSchema = new Schema ({
   body:{type:String, required:true},
   source:{type:String, required:true},
   comment:{type:String, required:false},
   alert: {type:Boolean, required:false, default:false},
   author_id: {type:Schema.Types.ObjectId, ref:"user"},
   ask_id:{type:Schema.Types.ObjectId, ref:"ask"}
})

export default model("guess", guessSchema, "guess"); 
