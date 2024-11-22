export const errorMiddleware=(error,req,res,next)=>{

    const status= error.status || 500
    const message = error.message || "BACKEND ERROR"
    const extraDetails = error.extraDetails || "Error from Backend"

   return res.status(status).json({message,extraDetails}) 
}