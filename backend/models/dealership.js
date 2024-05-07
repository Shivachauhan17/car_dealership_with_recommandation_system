const mongoose=require('mongoose')
mongoose.pluralize(false)

const dealerSchema=mongoose.Schema({
  dealership_email:{
    required:true,
    type:String
  },
  
  dealership_name:{
    required:true,
    type:String
  },
  dealership_location:{
    required:true,
    type:String
  },
  password:{
    required:true,
    type:String
  },
  dealership_info:{
    required:Object,
    type:String
  },
  cars:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car'
    }
  ],
  deals:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Deal'
  }],
  sold_vehicles:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'SoldVehicle'
  }]
})


dealerSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject.password
        delete returnedObject._id
        delete returnedObject.__v
    }})

const Dealership=mongoose.model('Dealership',dealerSchema)
module.exports=Dealership