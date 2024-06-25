const {ApolloServer}=require('@apollo/server')
const mongoose=require('mongoose')
const {GraphQLError}=require('graphql')
const {startStandaloneServer}=require('@apollo/server/standalone')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('./config/config')

const connectMongo=require('./utils/connect_db')

const { Query } = require('mongoose')
connectMongo()


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
        id:ID!
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
        id:ID!
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
        carsOfCertainDealership:[Car]!
        dealsOfCertainDealership:[Deal]!
        dealsOfCertainDealershipByEmail(dealership_email:String!):[Deal]!
        dealershipWithCertainCar(carID:String!):[Dealership]!
        carsOfCertainDealershipByEmail(dealership_email:String!):[Car]!

        vehicleOwnedByUser:[SoldVehicle]!
        viewAllDealsOnCertainCar(carID:String!):[Deal]!
        viewDealershipVehiclesSold:[SoldVehicle]!
        getCategories:[String]!
    }

    type LoginResponse{
        msg:String!
        token:String!
        error:String!
        type:String!
    }

    type Mutation{
        login(email:String!,password:String!,selectedRole:String!):LoginResponse!
        register(name:String!,email:String!,phoneNumber:String!,password:String!,selectedRole:String!,location:String!,dealerInfo:String!,userInfo:String!):String!
        dealCompleted(dealershipEmail:String!,carID:String!,userEmail:String!,dealID:String!,sold_price:Int!,sold_date:String!,description:String!):String!
        addCarToDealership(carID:String!):String!
        addDealToDealership(carID:String!,discount:Int!,description:String!):String!
        deleteDealFromDealership(dealID:String!):String!
    }

    
`


const resolvers={
    Query:{
        getCategories:async(root,args,context)=>{
            try{
                const categories=await Car.distinct('type')
                return categories
            }
            catch(e){
                console.log(e)
                throw new GraphQLError("failed to fetch list of all categories")
            }
        },
        viewAllCars:async(root)=>{
            try{
                const cars=await Car.find({})
                return cars
            }
            catch(e){
                console.log(e)
                throw new GraphQLError("failed to fetch car data")
            }
            
        },

        carsOfCertainDealership:async(root,args,context)=>{
            const dealershipEmail=context.username
            if(!dealershipEmail){
                throw new GraphQLError("input parameters are not right")
            }

            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('cars')
            return dealership.cars

        },

        carsOfCertainDealershipByEmail:async(root,args)=>{
            const {dealership_email}=args

            if(!dealership_email){
                throw new GraphQLError("input parameters are not right")
            }

            const dealership=await Dealership.findOne({dealership_email:dealership_email}).populate('cars')
            return dealership.cars

        },

        dealsOfCertainDealership:async(root,args,context)=>{
            const dealershipEmail=context.username
            if(!dealershipEmail){
                throw new GraphQLError("inpur parameters are not right")
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
        dealsOfCertainDealershipByEmail:async(root,args)=>{
            const {dealership_email}=args
            if(!dealership_email){
                throw new GraphQLError("inpur parameters are not right")
            }

            const dealership=await Dealership.findOne({dealership_email:dealership_email}).populate(
                {
                    path:'deals',
                    populate:{
                        path:'car_id'
                    }
                }
            )
            return dealership.deals

        }
        ,

        dealershipWithCertainCar:async(root,args)=>{
            const {carID}=args
            if(!carID){
                throw new GraphQLError("inpur parameters are not right")
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

        vehicleOwnedByUser:async(root,args,context)=>{
            const userEmail=context.username
            if(!userEmail){
                throw new GraphQLError("inpur parameters are not right")
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
                throw new GraphQLError("input parameters are not given correctly")
            }

            const deals=await Deal.find({car_id:new mongoose.Types.ObjectId(carID)}).populate('car_id')
            
            return deals
        },
        viewDealershipVehiclesSold:async(root,args,context)=>{
            const dealershipEmail=context.username
            if(!dealershipEmail){
                throw new GraphQLError("input parameters are not given correctly")
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
            return dealership.sold_vehicles
        }

    },

    Mutation:{
        register:async (root,args)=>{
            const {name,email,phoneNumber,password,selectedRole,location,dealerInfo,userInfo}=args
            if(!location || !name || !email || !phoneNumber || !password || !selectedRole){
                throw new GraphQLError("inpur parameters are not right")
            }

            try{
                if(selectedRole==="dealership"){
                    console.log("as a dealer")
                    if( !dealerInfo){
                        throw new GraphQLError("inpur parameters are not right")
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
                        throw new GraphQLError("input parameters are not correctl ")
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
                throw new GraphQLError("error in registering the user")

            }
        },

        login:async(root,args)=>{
            const { email,password,selectedRole } = args

            if(!email ||  !password || !selectedRole){
                throw new GraphQLError("input parameters are not correctl ")
            }

            try{
                if(selectedRole==="dealership"){
                    console.log("as a dealer")
                    const dealership=await Dealership.findOne({dealership_email:email})
                    if(!dealership)
                        return {msg:null,token:null,error:"no such dealership exists",type:""}
                    const isMatch=bcrypt.compare(password,dealership.password)
                    if(!isMatch)
                        return {msg:null,token:null,error:"invalid credentials, Please Try agauin",type:""}
                    const userForToken = {
                        username: dealership.dealership_email,
                        type:"dealership",
                        id: dealership.id,
                    } 
                    const token=await jwt.sign(userForToken,JWT_SECRET)
                    return  {msg:"dealership successfully verified logging you in",token:token,error:null,type:"dealership"}
        
                }
                else{
                    console.log("as a user")
                    const user=await User.findOne({user_email:email})
                    
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
                    const token=await jwt.sign(userForToken,JWT_SECRET)
                    return {msg:"user successfully verified logging you in",token:token,error:null,type:"user"}
                }

            }
            catch(e){
                console.log(e)
                throw new GraphQLError("error in sign-in")
            }

        },

        deleteDealFromDealership:async(root,args,context)=>{
            const dealershipEmail=context.username
            const {dealID}=args
            if(!dealershipEmail || !dealID){
                throw new GraphQLError("input parameters are not correctl ")
            }

            try{
                await Dealership.findOneAndUpdate({
                    dealership_email:dealershipEmail
                    },{
                      $pull:{deals:new mongoose.Types.ObjectId(dealID)}  
                    })

                await Deal.deleteOne({_id:new mongoose.Types.ObjectId(dealID)})
                
                return "successfully removed the deal from dealership"

            }
            catch(e){
                console.log(e)
                throw new GraphQLError("error in removing the deal from dealership")
            }

        },

        dealCompleted:async(root,args)=>{
            const {dealershipEmail,carID,dealID,sold_price,sold_date,description,userEmail}=args

            if(!dealershipEmail ||  !carID || !dealID || !sold_price || !userEmail || !sold_date || !description){
                throw new GraphQLError("input parameters are not correctl ")
            }

            try{
                const vehicle_info={
                    sold_price:sold_price,
                    sold_date:sold_date,
                    description:description
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
                })

                await Deal.findOneAndDelete({_id:new mongoose.Types.ObjectId(dealID)})

                return "deal has been completed successfully"

            }
            catch(e){
                console.log(e)
                throw new GraphQLError("error in fetching all cars data")
            }
        },

        addCarToDealership:async(root,args,context)=>{
            
            const dealershipEmail=context.username
            
            const {carID}=args

            if(!carID || !dealershipEmail){
                throw new GraphQLError("input parameter does not sent correctly")
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
                throw new GraphQLError("error adding new acr to inventory")
            }

        },


        addDealToDealership:async(root,args,context)=>{
            const dealershipEmail=context.username
            const {discount,description,carID}=args
            if(!dealershipEmail || !carID || !description){
                throw new GraphQLError("input parameter does not sent correctly")
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
                throw new GraphQLError("failed to add the deal")
            }
        },


    }
}

const server=new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server,{
    listen:{port:4000},
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
          )
          return decodedToken
        }
      },
}).then(({url})=>{
    console.log(`server is ready at ${url}`)
})

module.exports={
    resolvers,
    typeDefs
}