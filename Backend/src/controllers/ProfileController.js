
import userModel from "../models/userSchema.js";
import jwt from 'jsonwebtoken'



 const getProfile= async (req,res)=>{
    const token = req.cookies.token
    const {id}= jwt.decode(token)

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

   return res.send("profile page")

    console.log("profile created");
}

 const createProfile= async (req,res)=>{
    const  token = req.cookies.token;
    const {id}= jwt.decode(token)
    console.log(id,"id");

const data=req.body
try{
    
    if(data.skills.length>10){
        res.status(400).send("update not allowed")

    }
    const userProfile = await userModel.findByIdAndUpdate(id,data,{runValidators:true})
    if(userProfile){
        res.status(200).send("Profile created Sucessfully")
    }
    else{
        res.send("Profile did't created")
    }

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