const connectDb=require('./db')
const mongoose=require('mongoose')
const express = require('express');
connectDb()

const Car=require('./models/car')
const User=require('./models/user')
const Dealership=require('./models/dealership')
const SoldVehicle=require('./models/sold_vehicle')
const Deal=require('./models/deal')

const app = express();

// Middleware to parse JSON
app.use(express.json());

//a. To view all cars
app.get('/cars',async(req,res)=>{
    try{
        const cars=await Car.find({})
        res.status(200).json({
            data:cars,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in cars data  reading"
        })
    }
    
})

//b. To view all cars in a certain dealership
app.get('/cars_dealership',async(req,res)=>{
    try{
        const {dealershipEmail}=req.query
        if(!dealershipEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('cars')
        res.status(200).json({
            data:dealership.cars,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in cars data  reading for your given dealership"
        })
    }
    
})

//c.To add new vehicle to the list of owned/sold vehicles at user/dealership end 
//after a deal is complete
app.post('/deal_complete',async(req,res)=>{
    try{
        const {dealershipEmail,carID,userEmail}=req.body

        if(!dealershipEmail || !carID || !userEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }

        
        const sold_vehicle=new SoldVehicle({
            car_id:mongoose.Types.ObjectId(carID)

        })

        const sold_vehicle_doc=await sold_vehicle.save()

        await User.findOneAndUpdate({
            user_email:userEmail
        },{
            $addToSet:{
                vehicle_info:mongoose.Types.ObjectId(sold_vehicle_doc.id)
            }
        })

        const deal=new Deal({
            car_id:mongoose.Types.ObjectId(carID)
        })

        const deal_doc=await deal.save()

        
        await Dealership.findOneAndUpdate({
            dealership_email:dealershipEmail
        },{
            $addToSet:{
                sold_vehicles:mongoose.Types.ObjectId(carID),
                deals:mongoose.Types.ObjectId(deal_doc.id)
            },
            $pull:{
                car:{
                    $ne:mongoose.Types.ObjectId(carID)
                }
            }
        },{new:true})



        res.status(200).json({
            data:{
                msg:"deal completed successfully"
            },
            error:null
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            data:null,
            error:"error in deal completion"
        })
    }


})  

//d. To view all deals from a certain dealership
app.get('/deals_of_dealership',async(req,res)=>{
    try{
        const {dealershipEmail}=req.query
        if(!dealershipEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('deals')
        res.status(200).json({
            data:dealership.deals,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in cars data  reading for your given dealership"
        })
    }
    
})

//a. To view dealerships with a certain car
app.get('/dealership_of_car',async(req,res)=>{
    try{
        const {carID}=req.query
        if(!carID){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const dealership=await Dealership.findOne(
            {
            cars:{
                $elemMatch:{
                    $eq:mongoose.Types.ObjectId(carID)
                }
            }
        }
    ).populate('deals')
        res.status(200).json({
            data:dealership.deals,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in cars data  reading for your given dealership"
        })
    }
    
})

// b. To view all vehicles owned by user 
//along with dealer info.

app.get('/vehicle_of_user',async(req,res)=>{
    try{
        const {userEmail}=req.query
        if(!userEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const user=await User.findOne(
            {
                user_email:userEmail
            }
        ).populate('vehicle_info')

        const User_to_process=await User.findOne(
            {
                user_email:userEmail
            }
        )
        const  dealers={}

        for(let i=0;i<User_to_process.vehicle_info?.length;i++){
            const dealership=await Dealership.findOne(
                {
                sold_vehicles:{
                    $elemMatch:{
                        $eq:mongoose.Types.ObjectId(User_to_process.vehicle_info[i])
                    }
                }
            }
        )
        dealers.push(dealership)
        }

        user.dealers=dealers



        res.status(200).json({
            data:user,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error finding vehicle of user"
        })
    }
    
})

//c. To view all deals on a certain car
app.get('/deal_of_cars',async(req,res)=>{
    try{
        const {carID}=req.query
        if(!carID){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const deal=await Deal.find({car_id:carID}).populate('car_id')

        res.status(200).json({
            data:deal,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in cars data  reading for your given dealership"
        })
    }
})

// a. To add cars to dealership
app.post('/add_dealership',async(req,res)=>{
    try{
        const {carID}=req.body
        if(!carID){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const deal=new Deal({
          car_id:carID  
        })

        const deal_doc=await deal.save()

        res.status(200).json({
            data:deal_doc,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in creating a new dealership"
        })
    }

})

//b. To add deals to dealership
app.post('/add_deal_to_dealership',async(req,res)=>{
    try{
        const {dealID,dealershipEmail}=req.body
        if(!dealID || !dealershipEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        await Dealership.findOneAndUpdate({
            dealership_email:dealershipEmail
        },{
            $addToSet:{
              deals:mongoose.Types.ObjectId(dealID)  
            }
        }
        )

        res.status(200).json({
            data:{
                msg:"deal succesfully added"
            },
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in adding the deal"
        })
    }
})

// To view all vehicles dealership has sold 
app.post('/dealership_sold',async(req,res)=>{
    try{
        const {dealershipEmail}=req.body
        if(!dealershipEmail){
            return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
        }
        const dealership=await Dealership.findOne({
            dealership_email:dealershipEmail
        }
        ).populate('sold_vehicles')

        res.status(200).json({
            data:dealership.sold_vehicles,
            error:null
        })
    }
    catch(e){
        console.log("err:",e)
        res.status(500).json({
            data:null,
            error:"error in fetching dealrship solds"
        })
    }
})


// Start the server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
