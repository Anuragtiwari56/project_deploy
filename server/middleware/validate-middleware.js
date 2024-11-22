export const validate=(Schema)=>async(req,res,next)=>{

    try {
     const parseBody= await Schema.parseAsync(req.body)
     req.body=parseBody;
     next()

    } catch (error) {
        const status =422;
        const message= 'Fill the input properly'
        const extraDetails= error.errors[0].message
        const err ={
            status,
            message,
            extraDetails
        }
        console.log(err);

        
    //    res.status(400).send({msg:message })
        next(err)
    }
}
