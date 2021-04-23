import mongoose from 'mongoose';
const {Schema, model} = mongoose; 

const askSchema = new Schema ({
body: {type: String, required: true},
highlight: {type:String, required: true},
languages: {type:String, required:false},
author_id: {type:Schema.Types.ObjectId, ref:"user"},
alert: {type: Boolean, default: false, required: false},
comment: {type: String, required: false},
time: {type: Date, default: Date.now}

})

export default model("ask", askSchema, "ask");