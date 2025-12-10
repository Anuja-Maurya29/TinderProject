
import userModel from "../models/userSchema.js";
import jwt from 'jsonwebtoken'




 const getProfile= async (req,res)=>{
    const token = req.cookies.token
    // console.log(jwt.verify(token,process.env.SECRET));
    const {id}= jwt.verify(token,process.env.SECRET)
    if(!token){
      return  res.status(401).json({
            sucess:"false",
            message:"token invalid pls login"
        })
    }

    try{

        const user = await userModel.findById(id)
        console.log(user,"user");
        if(user){
            res.status(200).send(user)
        }
        else{
            res.status(404).send("user Not Found")
        }
    }
    catch(error){
        res.status(400).json({sucess:false,message:error.message})

    }

}

 const createProfile= async (req,res)=>{
    const  token = req.cookies.token;
    const {id}= jwt.verify(token,process.env.SECRET)
    console.log(id,"id");

const data=req.body
console.log(data,"upaded data from frontend");
try{
    
    if(data.skills.length>10){
        return res.status(400).send("update not allowed")

    }
    const userProfile = await userModel.findByIdAndUpdate(id,data,{new:true,runValidators:true})
    if(userProfile){
       
        res.status(200).send(userProfile)
    }
    else{
        res.send("Profile did't created")
    }
    console.log(userProfile," data updfated from backend");

}
catch(error){
    res.status(400).json({
        sucess:false,
        message:"Something went wrong"
    })
}



}



export default {
    getProfile,createProfile
}