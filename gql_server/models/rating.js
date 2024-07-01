const mongoose=require('mongoose')
mongoose.pluralize(false)

const ratingSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    carName:{
        type:String,
        required:true,
    },
    date:{
        required:true,
        type: Date,
        default:new Date()
    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car'
    }
})

const Rating=mongoose.model('Rating',ratingSchema)
module.exports=Rating