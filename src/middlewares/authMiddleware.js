import jwt from 'jsonwebtoken'
import userModel from '../models/userSchema.js'
 export const authMiddleware =async (req,res,next)=>{

  try{
      const token = req.cookies.token
    // console.log(token,"token");

    if(!token){
        res.status(401).json({
            sucess:false,
            message:"Unauthorised user"
        })
    }

    
const verify = jwt.verify(token,process.env.SECRET)

const {id} =verify
// console.log(id,"id");

const userId = await userModel.findById(id)
// console.log(userId,"userrrr");
if(!userId){
    throw new error("user not found")
}

req.user=userId;

next()

  }
  catch(error){
    res.status(400).json({
      sucess:false,
      message:error.message
    })
  }

}