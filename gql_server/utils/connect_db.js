const mongoose=require('mongoose')
const { DB_STRING } =require('../config/config')
const path =require('path')


const connectMongo=()=>{
    if(DB_STRING){
        mongoose.connect(DB_STRING)
            .then(()=>{
                console.log("database is connected")
            })
            .catch(()=>{
                throw new Error("Error in databse connection Function",path.basename(__filename),8)
            })
    }
    else{
        throw new CustomError("string given for database connection is null",path.basename(__filename),2)
    }
}

module.exports=connectMongo