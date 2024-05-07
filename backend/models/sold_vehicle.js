const mongoose=require('mongoose')
mongoose.pluralize(false)

const soldVehicleSchema=mongoose.Schema({
    
    car_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car'
    },
    vehicle_info:{
        type:Object,
        required:true
    }
})


soldVehicleSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }})

const SoldVehicle=mongoose.model('SoldVehicle',soldVehicleSchema)

module.exports=SoldVehicle