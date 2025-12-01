import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({

fromUser:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"

},

toUser:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
},
status:{
    type:String,
    enum:{
        values:["ignore","intrested","accepted","rejected"],
        message:"${VALUE} is incorrect"
    },
    required:true,
}

},{
    timestamps:true
})

// creating index(compound)
connectionSchema.index({fromUser:1,toUser:1})


const connectionModel = new mongoose.model("connectionRequest",connectionSchema)
export default connectionModel;
