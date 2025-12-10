import express from "express";
import connectionModel from "../models/connectionSchema.js";
import userModel from "../models/userSchema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

//intrested or ignore handlers

const request = async (req, res) => {
  //from user A to user B with status
  try {
    
    const loggedInUser=req.user
    // console.log(typeof(id));
    
    const fromUser = loggedInUser._id
   
    const toUser = req.params.toUser;
    const status = req.params.status;
  

    const allowedStatus = ["ignore", "intrested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid status type",
      });
    }

    //same user
  
    if(fromUser===toUser){
        return res.status(400).json({
            sucess:true,
            message:"self request is not allowed"
        })
    }

//if user does not exist
const userExist = await userModel.findById(toUser)
// console.log(userExist,"userExist");

if(!userExist){
    return res.status(404).json({
        sucess:false,
        message:"user doesn't exists"
    })
}

    const requestExists = await connectionModel.findOne({
      $or: [
        { fromUser: fromUser, toUser: toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });
    console.log(userExist, "check request");

    if (requestExists) {
       return res.status(400).json({
        status: false,
        message: "request already exists",
      });
    }

    const newRequest = new connectionModel({
      fromUser,
      toUser,
      status,
    });
    const data = await newRequest.save();

    res.status(200).json({
      sucess: true,
      message: `${req.user.firstName} sents ${status} request to ${userExist.firstName}`,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};



const review = async (req, res) => {
  //loggend user 

 try{
   const {id} = req.user

  const loggedInUser= req.user

  const status=req.params.status
  const requestId = req.params.requestId

  const allowedStatus = ["accepted","rejected"]
 
  if(!allowedStatus.includes(status)){
    return res.status(400).json({
      sucess:false, 
      message:"status invalid"
    })
  }



  const connectionExist = await connectionModel.findOne({
    _id:requestId ,
     toUser:loggedInUser._id,
     status:"intrested"
  })

  if(!connectionExist){
    return res.status(400).json({
      sucess:false,
      message:"Connection  dosen't exists"
    })
  }
  
    

  //modify the status  of connection
  connectionExist.status=status
  const connectionUpdated = await connectionExist.save()
  
  res.status(201).send(`${loggedInUser.firstName} ${status} request `)

 }
 catch(error){
  res.status(400).json({
    sucess:false,
    message:error.message
  })
 }

}



export default {
  request,review
};


