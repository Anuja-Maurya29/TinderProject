import userModel from "../models/userSchema.js";
import connectionModel from "../models/connectionSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";



const getAllRequest=async (req,res)=>{
  try{

    const loggedInUser = req.user
  const userID =loggedInUser._id
  console.log(userID,"userid");

  const allrequests = await connectionModel.find({
    
      toUser:userID,
      status:"intrested"
    
  }).populate("fromUser",["firstName","lastName"]);


  if(!allrequests){
    return res.status(404).send("no request found")
  }
  
// console.log(allrequests,"allrequest");
  res.status(200).json({
    message:"request fetched",
    data:allrequests
  })

  }
  catch(error)
  {
req.status(400).send("error:",error.message)
  }
}

const getConnections = async (req,res)=>{

  try{
const loggedInUser = req.user;

const connectionRequest = await connectionModel.find({
  $or:[
    {toUser:loggedInUser._id,status:"accepted"},
    {fromUser:loggedInUser._id,status:"accepted"}
  ]
}).populate("fromUser",["firstName","lastName"]).populate("toUser",["firstName","lastName"])

res.status(200).json({
  sucess:true,
  message:"connections found",
  data:connectionRequest

})

  }
  catch(error){
    res.status(400).send({message:error.messgae})
  }
}

export default {
  getAllRequest,getConnections
}