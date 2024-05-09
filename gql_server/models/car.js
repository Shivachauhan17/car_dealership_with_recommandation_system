const mongoose=require('mongoose')
const SoldVehicle = require('./sold_vehicle')

mongoose.pluralize(false)

const carSchema=mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    car_info:{
        type:Object,
        required:true
    }
})



carSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Car=mongoose.model('Car',carSchema)

module.exports=Car