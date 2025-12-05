import mongoose from "mongoose";
//defining structure
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "First name is required"],
      minLength: [3, "Name should contains atleast 5 char"],
      maxLength: [50, "Name must be less than 50 char"],
      trim: true,
    },
    lastName: {
      type: String,
     
      minLength: [3, "Name should contains atleast 5 char"],
      maxLength: [50, "Name must be less than 50 char"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "User email is required"],
      unique: [true, " Account already registered"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: [true, "password must required"],
      select:false,
    },

    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpirtDate: {
      type: String,
    },
    
      
      image:{
        type:String,
        default:"/uploads/dummy.png"
      },
      country: {
        type: String,
      },
      gender: {
        type: String,
        lowercase:true,
        enum:{

          values:["male","female","others"],
          message:"${VALUE} specified is not applicable"
        },
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("Gender is not valid")
          }
        }
      },
      age: {
        type: Number,
        min:18,
        max:65
      },
      profile:{
        type:String,
      },
      skills:{
        type:[],
        min:5,
      },
      about:{
        type:String
      },
        linkdn: {
          type: String,
          default:"url"
        },
        github: {
          type: String,
          default:"url"
        },
      
    },
  
  {
    timestamps: true,
  }
);
 // creating index on email for login
// userSchema.index({email:1})

// creating a model

const userModel = mongoose.model("user", userSchema);
export default userModel;
