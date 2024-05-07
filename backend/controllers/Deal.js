const express = require('express');
const User = require('../models/user');
const Dealership=require('../models/dealership')
const Car=require('../models/car')
const Deal=require('../models/deal')
const SoldVehicle=require('../models/sold_vehicle')
const mongoose=require('mongoose')

const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken")
const jwtSecret = "mynameisajayshakyaIamFrommyownw"


const authControllers={
    cars:async(req,res)=>{
        console.log("in cars")
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
        
    },


    deal_complete:async(req,res)=>{
        try{
            const {dealershipEmail,dealID,carID,userEmail,vehicle_info}=req.body
    
            if(!dealershipEmail || !carID || !userEmail || !dealID || !vehicle_info){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
    
            
            const sold_vehicle=new SoldVehicle({
                car_id:new mongoose.Types.ObjectId(carID),
                vehicle_info:vehicle_info
            })
    
            const sold_vehicle_doc=await sold_vehicle.save()
    
            await User.findOneAndUpdate({
                user_email:userEmail
            },{
                $addToSet:{
                    vehicle_info:new mongoose.Types.ObjectId(sold_vehicle_doc.id)
                }
            })
        
            
            await Dealership.findOneAndUpdate({
                dealership_email:dealershipEmail
            },{
                $addToSet:{
                    sold_vehicles:new mongoose.Types.ObjectId(sold_vehicle_doc.id),
                    
                },
                $pull:{
                    deals:new mongoose.Types.ObjectId(dealID)
                }
            },{new:true})


            await Deal.findOneAndDelete({_id:new mongoose.Types.ObjectId(dealID)})
    
    
    
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
    
    
    },
    cars_dealership:async(req,res)=>{
        try{
            const {dealershipEmail}=req.query
            if(!dealershipEmail){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('cars').exec()
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
        
    },
    deals_of_dealership:async(req,res)=>{
        try{
            const {dealershipEmail}=req.query
            if(!dealershipEmail){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate(
                {
                    path:'deals',
                    populate:{
                        path:'car_id'
                    }
                }
            )
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
        
    },
    dealership_of_car:async(req,res)=>{
        try{
            const {carID}=req.query
            if(!carID){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const dealership=await Dealership.find(
                {
                cars:{
                    $elemMatch:{
                        $eq:new mongoose.Types.ObjectId(carID)
                    }
                }
            }
        )//.populate('deals')
            res.status(200).json({
                data:dealership,
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
        
    },
    vehicle_of_user:async(req,res)=>{
        try{
            const {userEmail}=req.query
            if(!userEmail){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const user=await User.findOne(
                {
                    user_email:userEmail
                }
            ).populate({
                path:'vehicle_info',
                populate:{
                    path:'car_id'
                }
            }
        )
    
            const User_to_process=await User.findOne(
                {
                    user_email:userEmail
                }
            )
            const  dealers=[]
    
            for(let i=0;i<User_to_process.vehicle_info?.length;i++){
                const soldVehicle=await SoldVehicle.findOne({_id:User_to_process.vehicle_info[i]})
                const dealership=await Dealership.findOne({ sold_vehicles: { $elemMatch: { $eq:soldVehicle.car_id } } })

                if (dealership)
                    dealers.push(dealership)
                }
    
            // user.dealers=dealers
    
    
    
            res.status(200).json({
                data:{user:user,dealers:dealers},
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
        
    },
    deal_of_cars:async(req,res)=>{
        try{
            const {carID}=req.query
            if(!carID){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const deals=await Deal.find({car_id:new mongoose.Types.ObjectId(carID)}).populate('car_id')
    
            res.status(200).json({
                data:deals,
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
    }, 
    add_dealership:async(req,res)=>{
        try{
            const {carID,dealershipEmail}=req.body
            console.log(req.body)
            if(!carID || !dealershipEmail){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            
            await Dealership.findOneAndUpdate({dealership_email:dealershipEmail},{
                $addToSet:{
                    cars:new mongoose.Types.ObjectId(carID)
                }
            })
    
            res.status(200).json({
                data:{msg:"successfully added to dealership"},
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
    
    },
    add_deal_to_dealership:async(req,res)=>{
        try{
            const {dealershipEmail,deal_info,carID}=req.body
            if( !dealershipEmail || !deal_info || !carID) {
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }

            const newDeal= new Deal({
                car_id:new mongoose.Types.ObjectId(carID),
                deal_info:deal_info
            })

            const savedDeal=await newDeal.save()

            

            await Dealership.findOneAndUpdate({
                dealership_email:dealershipEmail
            },{
                $addToSet:{
                  deals:new mongoose.Types.ObjectId(savedDeal.id)  
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
    },
    dealership_sold:async(req,res)=>{
        try{
            const {dealershipEmail}=req.query
            if(!dealershipEmail){
                return res.status(400).json({data:null,error:"input paramters are not sent correctly"})
            }
            const dealership=await Dealership.findOne({
                dealership_email:dealershipEmail
            }
            ).populate({
                path:'sold_vehicles',
                populate:{
                    path:'car_id'
                }
            })
    
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
    }      
    




}







module.exports=authControllers;

