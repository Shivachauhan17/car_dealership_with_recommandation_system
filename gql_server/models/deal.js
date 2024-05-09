const mongoose=require('mongoose')

mongoose.pluralize(false)


const dealSchema=mongoose.Schema({
    
    car_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car'
    },
    deal_info:{
        type:Object,
        required:true
    }

})

dealSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }})

const Deal=mongoose.model('Deal',dealSchema)

module.exports=Deal