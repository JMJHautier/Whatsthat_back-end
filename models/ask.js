import mongoose from 'mongoose';
const {Schema, model} = mongoose; 

const askSchema = new Schema ({
body: {type: String, required: true},
whatsthat: {type:String, required: true},
language: {type:String, required:false},
author: {type:Schema.Types.ObjectId, required:true, ref:"user"},
alert: [{type:Schema.Types.ObjectId, ref:"author"}],
comment: {type: String, required: false},
guess: [{type:Schema.Types.ObjectId,ref:'guess'}],
time: {type: Date, default: Date.now}

})

export default model("ask", askSchema, "ask");