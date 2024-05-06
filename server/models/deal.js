const mongoose=required('mongoose')

mongoose.pluralize(false)


const dealSchema=mongoose.Schema({
    
    car_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car'
    },
    deal_info:{
        type:String
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