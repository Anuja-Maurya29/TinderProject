import express from "express";
import connectionModel from "../models/connectionSchema.js";
import userModel from "../models/userSchema.js";

//intrested or ignore handlers

const request = async (req, res) => {
  //from user A to user B with status
  try {
    
    const {id}=req.user
    // console.log(req.user,"req.user");
    
    
    const fromUser = id
    const toUser = req.params.toUser;
    const status = req.params.status;
    console.log(toUser);

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
console.log(userExist.firstName,"fname");
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
  const userID = req.id;
};

export default {
  request,
};
