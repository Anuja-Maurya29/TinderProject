import userModel from "../models/userSchema.js";

import jwt from "jsonwebtoken";

export const userController = async (req, res) => {
    
  try {
    const results = await userModel.find();
    if(!results){
      res.send("no profiles yet")
    }
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

