import mongoose from 'mongoose'; 
const {Schema, model} = mongoose; 

const guessSchema = new Schema ({
   body:{type:String, required:true},
   source:{type:String, required:true},
   ask_id:{type:Schema.Types.ObjectId, required:true, ref:"ask"},
   comment:{type:String, required:false},
   alert: {type:Boolean, required:false, default:false},
   author_id: {type:Schema.Types.ObjectId, ref:"user"},
   rating_positive: {type:Number, default:0},
   rating_negative: {type:Number, default:0},
   verified: {type:Boolean, required:false, default:false}
})

export default model("guess", guessSchema, "guess"); 