import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({

fromUser:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,

},

toUser:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
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


const connectionModel = new mongoose.model("connectionRequest",connectionSchema)
export default connectionModel;
