const {ApolloServer}=require('@apollo/server')
const mongoose=require('mongoose')
const {GraphQlError}=require('graphql')
const {startStandaloneServer}=require('@apollo/server/standalone')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('./config/config')

const connectMongo=require('./utils/connect_db')
const { Query } = require('mongoose')
// connectMongo()


const Car=require('./models/car')
const Dealership=require('./models/dealership')
const User=require('./models/user')
const SoldVehicle=require('./models/sold_vehicle')
const Deal=require('./models/deal')

const { register } = require('module')

const typeDefs=`

    type CarInfo{
        price:Int!
        milage:Int!
        description:String!
    }

    type Car{
        id:ID!
        type:String!
        name:String!
        model:String!
        car_info:CarInfo!
    }

    type SoldVehicleInfo{
        sold_price:Int!
        sold_date:String!
        description:String!
    }

    type SoldVehicle{
        id:ID!
        car_id:Car!
        vehicle_info:SoldVehicleInfo!
    }

    type DealInfo{
        discount:Int!
        description:String!
    }

    type Deal{
        car_id:Car!
        deal_info:DealInfo!
    }

    type Admin{
        id:ID!
        admin_id:String!
    }

    type User{
        id:ID!
        user_email:String!
        user_location:String!
        user_info:String!
        vehicle_info:[SoldVehicle]!
    }

    type Dealership{
        dealership_email:String!
        dealership_name:String!
        dealership_location:String!
        dealership_info:String!
        cars:[Car]!
        deals:[Deal]!
        sold_vehicles:[SoldVehicle]!
    }


    type Query{
        viewAllCars:[Car]!
        carsOfCertainDealership(dealershipEmail:String!):[Car]!
        dealsOfCertainDealership(dealershipEmail:String!):[Deal]!
        dealershipWithCertainCar(carID:String!):[Dealership]!

        vehicleOwnedByUser(userEmail:String!):[SoldVehicle]!
        viewAllDealsOnCertainCar:[Deal]!
        viewDealershipVehiclesSold:[SoldVehicle]!
    }

    type LoginResponse{
        msg:String!
        token:String!
        error:String!
    }

    type Mutation{
        login(email:String!,password:String!,selectedRole:String!):LoginResponse!
        register(name:String!,email:String!,phoneNumber:String!,password:String!,selectedRole:String!,location:String!,dealerInfo:String!,userInfo:String!):String!
        dealCompleted(dealershipEmail:String!,carID:String!,userEmail:String!,dealID:String!,vehicle_info:String!):String!
        addCarToDealership(carID:String!,dealershipEmail:String!):String!
        addDealToDealership(dealID:String!,dealershipEmail:String!,discount:Int!,description:String!):String!

    }

    
`


const resolvers={
    Query:{
        viewAllCars:async(root)=>{
            try{
                const cars=await Car.find({})
                return cars
            }
            catch(e){
                console.log(e)
                throw new GraphQlError("failed to fetch car data")
            }
            
        },

        carsOfCertainDealership:async(root,args)=>{
            const {dealershipEmail}=args
            if(!dealershipEmail){
                throw new GraphQlError("inpur parameters are not right")
            }

            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('cars')
            return dealership.cars
        },

        dealsOfCertainDealership:async(root,args)=>{
            const {dealershipEmail}=args
            if(!dealershipEmail){
                throw new GraphQlError("inpur parameters are not right")
            }

            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate(
                {
                    path:'deals',
                    populate:{
                        path:'car_id'
                    }
                }
            )
            return dealership.deals
        },

        dealershipWithCertainCar:async(root,args)=>{
            const {carID}=args
            if(!carID){
                throw new GraphQlError("inpur parameters are not right")
            }

            const dealerships=await Dealership.find(
                {
                cars:{
                    $elemMatch:{
                        $eq:new mongoose.Types.ObjectId(carID)
                    }
                }
            }
        )

            return dealerships
        },

        vehicleOwnedByUser:async(root,args)=>{
            const {userEmail}=args
            if(!userEmail){
                throw new GraphQlError("inpur parameters are not right")
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
            return user.vehicle_info

        },
        viewAllDealsOnCertainCar:async(root,args)=>{
            const {carID}=args
            if(!carID){
                throw new GraphQlError("input parameters are not given correctly")
            }

            const deals=await Deal.find({car_id:new mongoose.Types.ObjectId(carID)}).populate('car_id')
            
            return deals
        },
        viewDealershipVehiclesSold:async(root,args)=>{
            const {dealershipEmail}=req.query
            if(!dealershipEmail){
                throw new GraphQlError("input parameters are not given correctly")
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
            return dealership.sold_vehicle
        }

    },

    Mutation:{
        register:async (root,args)=>{
            const {name,email,phoneNumber,password,selectedRole,location,dealerInfo,userInfo}=args
            if(!location || !name || !email || !phoneNumber || !password || !selectedRole){
                throw new GraphQlError("inpur parameters are not right")
            }

            try{
                if(selectedRole==="dealership"){
                    console.log("as a dealer")
                    if( !dealerInfo){
                        throw new GraphQlError("inpur parameters are not right")
                    }
                    const existingUser = await Dealership.findOne({ dealership_email:email });
                    if (existingUser) {
                      return "with this email, user already exists"
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newDealer=new Dealership({
                      dealership_email:email,
                      dealership_name:name,
                      dealership_location:location,
                      password:hashedPassword,
                      dealership_info:dealerInfo
                    })
              
                    await newDealer.save();
                    return "dealership created successfully"
                }
                else {
                    if( !userInfo){
                        throw new GraphQlError("input parameters are not correctl ")
                    }
                    const existingUser = await User.findOne({ user_email:email });
                    if (existingUser) {
                      return "user with this email already exists"
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
            
                    const newUser=new User({
                      user_email:email,
                      user_location:location,
                      user_info:userInfo,
                      password:hashedPassword
                    })
            
                    await newUser.save()
                    return "user account successfully created"
                }
                return "type of account to be created is not selected"
            
            }
            catch(e){
                console.log(e)
                throw new GraphQlError("error in registering the user")

            }
        },

        login:async(root,args)=>{
            const { email,password,selectedRole } = args

            if(!email ||  !password || !selectedRole){
                throw new GraphQlError("input parameters are not correctl ")
            }

            try{
                if(selectedRole==="dealership"){
                    console.log("as a dealer")
                    const dealership=await Dealership.findOne({dealership_email:email})
                    if(!dealership)
                        return {msg:null,token:null,error:"no such dealership exists"}
                    const isMatch=bcrypt.compare(password,dealership.password)
                    if(!isMatch)
                        return {msg:null,token:null,error:"invalid credentials, Please Try agauin"}
                    const userForToken = {
                        username: dealership.dealership_email,
                        type:"dealership",
                        id: dealership.id,
                    } 
                    const token=await jwt.sign(userForToken,JWT_SECRET)
                    return  {msg:"dealership successfully verified logging you in",token:token,error:null}
        
                }
                else{
                    console.log("as a dealer")
                    const user=await User.findOne({dealership_email:email})
                    if(!user)
                        return {msg:null,token:null,error:"no such user exists"}
                    const isMatch=bcrypt.compare(password,user.password)
                    if(!isMatch)
                        return {msg:null,token:null,error:"wrong credentials"}
                    const userForToken = {
                        username: user.user_email,
                        type:"user",
                        id: user.id,
                    } 
                    const token=await jwt.sign(userForToken,jwtSecret)
                    return {msg:"user successfully verified logging you in",token:token,error:null}
                }

            }
            catch(e){
                console.log(e)
                throw new GraphQlError("error in sign-in")
            }

        },
        dealCompleted:async(root,args)=>{
            const {dealershipEmail,carID,dealID,vehicle_info,userEmail}=args

            if(!dealershipEmail ||  !carID || !dealID || !vehicle_info || !userEmail){
                throw new GraphQlError("input parameters are not correctl ")
            }

            try{
                const sold_vehicle=new SoldVehicle({
                    car_id:new mongoose.Types.ObjectId(carID),
                    vehicle_info:vehicle_info
                })

                await sold_vehicle.save()

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
                })

                await Deal.findOneAndDelete({_id:new mongoose.Types.ObjectId(dealID)})

                return "deal has been completed successfully"

            }
            catch(e){
                console.log(e)
                throw new GraphQlError("error in fetching all cars data")
            }
        },

        addCarToDealership:async(root,args)=>{
            const {carID,dealershipEmail}=args

            if(!carID || !dealershipEmail){
                throw new GraphQlError("input parameter does not sent correctly")
            }

            try{
                await Dealership.findOneAndUpdate({dealership_email:dealershipEmail},{
                    $addToSet:{
                        cars:new mongoose.Types.ObjectId(carID)
                    }
                })
    
                return "successfully added to dealership"
            }
            catch(e){
                console.log(e)
                throw new GraphQlError("error adding new acr to inventory")
            }

        },


        addDealToDealership:async(root,args)=>{
            const {dealershipEmail,discount,description,carID}=args
            if(!dealershipEmail || !discount || !carID || !description){
                throw new GraphQlError("input parameter does not sent correctly")
            }
            try{
                const newDeal= new Deal({
                    car_id:new mongoose.Types.ObjectId(carID),
                    deal_info:{
                        discount:discount,
                        description:description
                    }
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

                return "deal added successfully"

            }
            catch(e){
                console.log(e)
                throw new GraphQlError("failed to add the deal")
            }
        },


    }
}

module.exports={
    resolvers,
    typeDefs
}