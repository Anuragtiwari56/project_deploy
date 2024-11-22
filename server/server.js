import express from "express";
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";
import serviceRoute from "./routes/serviceRouter.js"
import adminRoute from "./routes/adminRouter.js"
import { dbConnect } from "./utils/db.js";
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv';
import { errorMiddleware } from "./middleware/error-middleware.js";
 

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT_NO;
app.use(cors())
app.use(express.json());
app.use(errorMiddleware);
 

// Route definitions
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data",serviceRoute)
app.use("/api/admin",adminRoute)

if(process.env.NODE_ENV === "production")
    {
        const dirPath= path.resolve()
    
        app.use(express.static("./clint/dist"))
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(dirPath,"./clint/dist","index.html"))
        })
    }
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
