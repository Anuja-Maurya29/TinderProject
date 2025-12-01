import userModel from "../models/userSchema.js";
import connectionModel from "../models/connectionSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";



const getAllRequest=async (req,res)=>{
  try{

    const loggedInUser = req.user
  const userID =loggedInUser._id
  console.log(userID,"userid");

  const allrequests = await connectionModel.find({
    
      toUser:userID,
      status:"intrested"
    
  }).populate("fromUser",["firstName","lastName"]);


  if(allrequests.length===0){
    return res.status(404).send("no request found")
  }

console.log(allrequests,"allrequest");
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

const explore = async (req,res)=>{
try{
  const loggedInUser = req.user

// find out all the connection req  sent/received
const allConnection = await connectionModel.find({
  $or:[{fromUser:loggedInUser._id},
    {toUser:loggedInUser._id}]
}).select("fromUser toUser status").populate("fromUser","firstName").populate("toUser","firstName")

const hiddenUsersId = new Set()

allConnection.forEach((user)=>{
  hiddenUsersId.add(user.fromUser._id.toString());
  hiddenUsersId.add(user.toUser._id.toString())
})



const feedUsers = await userModel.find({
  $and:[
{_id:{$nin :Array.from(hiddenUsersId) }},
{_id: {$ne :loggedInUser._id}}
  ]

})

res.send(feedUsers)

}
catch(error){
  res.status(400).json({
    sucess:false,
    message:error.message
  })
}
   


}


export default {
  getAllRequest,getConnections,explore
}