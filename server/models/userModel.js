import mongoose from "mongoose";
 import dotenv from 'dotenv'
 import jwt from 'jsonwebtoken'

 dotenv.config()
const userSchema = new mongoose.Schema({

username:{type:String,required:true},
email:{type:String,required:true , unique:true},
phone:{type:String,required:true},
password:{type:String,required:true},
isAdmin:{type:Boolean, default:false}
})


//json web token
userSchema.methods.generateToken=async function(){

    try {
     return jwt.sign({

        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin
     },
     process.env.JWT_SECRETKEY, 
    {
        expiresIn:"30d"
    }
    )  
    } catch (error) {
        console.log(error);
        
    }
}
 

export const User = new mongoose.model("User",userSchema)