import jwt from 'jsonwebtoken'
import userModel from '../models/userSchema.js'
 export const authMiddleware =async (req,res,next)=>{

  try{
      const token = req.cookies.token
    console.log(token,"token");

    if(!token){
        res.status(401).json({
            sucess:false,
            message:"Unauthorised user pls login"
        })
    }

    
const verify = jwt.verify(token,process.env.SECRET)


const {id} =verify
// console.log(id,"id");

const user = await userModel.findById(id)
// console.log(userId,"userrrr");
if(!user){
    throw new error("user not found")
}

req.user=user


next()

  }
  catch(error){
    res.status(400).json({
      sucess:false,
      message:error.message
    })
  }

}