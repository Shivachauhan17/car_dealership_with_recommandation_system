const {ApolloServer}=require('@apollo/server')
const mongoose=require('mongoose')
const {GraphQlError}=require('graphql')
const {startStandaloneServer}=require('@apollo/server/standalone')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const connectMongo=require('./utils/connect_db')
const { Query } = require('mongoose')
connectMongo()


const Car=require('./models/car')
const Dealership=require('./models/dealership')
const User=require('./models/user')

const typedefs=`

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
        dealership_id:String!
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


    type Mutation{
        dealCompleted(dealershipEmail:String!,carID:String!,userEmail:String!):String!
        addCarToDealership(carID:String):String!
        addDealToDealership(dealID:String!,dealershipEmail:String!,dealInfo:DealInfo!):String!

    }
`


const resolvers={
    Query:{
        viewAllCars:async(root)=>{
            const cars=await Car.find({})
            return cars
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

            const dealership=await Dealership.findOne({dealership_email:dealershipEmail}).populate('deals')
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
                            $eq:mongoose.Types.ObjectId(carID)
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

            const user=await User.findOne({user_email:userEmail}).populate('vehicle_info')

        }
    }
}