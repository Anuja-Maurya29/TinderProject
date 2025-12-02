import jwt from 'jsonwebtoken'

 export const extractId =(req,res,next)=>{

    const token = req.cookies.token
    const {id}= jwt.decode(token)
    return id;
    next()

}