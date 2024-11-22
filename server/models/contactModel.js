 import mongoose from "mongoose"
const contactSchema=new mongoose.Schema({


    username:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
})
export const Contact =new mongoose.model("Contact",contactSchema)