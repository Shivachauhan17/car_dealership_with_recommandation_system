const mongoose=require('mongoose')
mongoose.pluralize(false)


const userSchema=mongoose.Schema({
    user_email:{
        required:true,
        type:String
    },
    
    user_location:{
        required:true,
        type:String
    },
    user_info:{
        required:true,
        type:Object
    },
    password:{
        required:true,
        type:String
    },
    vehicle_info:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SoldVehicle'
    }]
})


userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject.password
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const User=mongoose.model('User',userSchema)

module.exports=User