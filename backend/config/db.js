const mongoose = require("mongoose")

function connectDB(uri){
  mongoose.connect(uri)
  .then(()=>console.log("MongoDB Connected✅"))
  .catch(err=>console.log("Connection failed❌"))
}

module.exports = connectDB;