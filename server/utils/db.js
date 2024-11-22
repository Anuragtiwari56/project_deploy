import mongoose from "mongoose";
 import dotenv from 'dotenv'

 dotenv.config()
 const  DBURL = process.env.MONGODB_URI
 

export const dbConnect = async()=>{

    try{

await mongoose.connect(DBURL)
console.log("DB connection established");

    }
    catch(error){ 
        console.log(error);
        
    }
}