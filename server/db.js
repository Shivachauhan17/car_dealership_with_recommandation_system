const mongoose= require('mongoose')

  const connectDb=async()=>{
      try{
          const connect= await mongoose.connect("")
          console.log("you are connected to the mongoDB")
      }
      catch(error){
          console.log(" connectDb Error  ", error)
      }
  
  }
  connectDb();
  module.exports=connectDb