//import { connect, Schema, model } from "mongoose";
/*const mongoose=require("mongoose")
mongoose 
.connect("mongodb://127.0.0.1:27017/LoginSignupTutorial")
.then(()=>{
    console.log("mongoose connected");
})
.catch((e) =>{
    console.log("failed to connect");
})

const LogInSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const LogInCollection = new model("LogInCollection",LogInSchema)
//export default collection
//export default  LogInCollection
module.exports = LogInCollection*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/LoginSignupTutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed to connect");
  });

const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

const LogInSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LogInCollection = model("LogInCollection", LogInSchema);

module.exports = LogInCollection;
