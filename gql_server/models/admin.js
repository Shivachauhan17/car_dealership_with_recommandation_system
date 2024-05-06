const mongoose=require('mongoose')

mongoose.pluralize(false)


const adminSchema=mongoose.Schema({
    admin_id:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})


adminSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin