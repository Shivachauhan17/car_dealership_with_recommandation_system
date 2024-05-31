const  {createTestClient} =require('apollo-server-testing')
const  {ApolloServer,gql} =require('apollo-server')
const {resolvers,typeDefs}=require('../index')
const connectMongo=require('../utils/connect_db')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/config')


const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhbmJkMjAxOUBnbWFpbC5jb20iLCJ0eXBlIjoiZGVhbGVyc2hpcCIsImlkIjoiNjY0Mzk5YTNlOTFlMjhmNTI4YmRiZDVkIiwiaWF0IjoxNzE2NzQ5ODU1fQ.U0eceoh9c3CLlXto7SllkZY_MWLuXvgvvTPBfjl3Qx4"

const server=new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhbmJkMjAxOUBnbWFpbC5jb20iLCJ0eXBlIjoiZGVhbGVyc2hpcCIsImlkIjoiNjY0Mzk5YTNlOTFlMjhmNTI4YmRiZDVkIiwiaWF0IjoxNzE2NzQ5ODU1fQ.U0eceoh9c3CLlXto7SllkZY_MWLuXvgvvTPBfjl3Qx4"
        if (auth ) {
          const decodedToken = jwt.verify(
            auth, JWT_SECRET
          )
        
          return decodedToken
        }
        }
})

const {query,mutate}=createTestClient(server)
jest.setTimeout(30000)


beforeAll(async () => {
    connectMongo()
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });


describe("testing all queries",()=>{
    
    test("get all cars",async()=>{
        const ALL_CARS=gql`
            query {viewAllCars{
                name
                type
                model
                car_info{
                    price
                    milage
                    description
                }
            }
            }
        `

        const result=await query({query:ALL_CARS})
            expect(typeof result.data.viewAllCars[0].name).toBe('string')
    })


    test("cars of a dealership",async()=>{
        const CARS_OF_DEALERSHIP=  gql`
            query CarsOfCertainDealership($dealershipEmail:String!){
                carsOfCertainDealership(dealershipEmail:$dealershipEmail){
                name
                type
                model
                car_info{
                    price
                    milage
                    description
                }
                }
            }
        `

        const variables={
            dealershipEmail:"shivanbd2019@gmail.com"
        }

        const result=await query({query:CARS_OF_DEALERSHIP,variables})
        console.log(result.data)
        expect(typeof result.data.carsOfCertainDealership[0].name).toBe('string')
    },30000)


    test("deals of certain dealership",async()=>{
        const DEALS_OF_DEALERSHIP=gql`
            query {
                dealsOfCertainDealership{
                    car_id{
                        name
                        type
                        model
                        car_info{
                            price
                            milage
                            description
                        }
                    }
                    deal_info{
                        discount
                        description
                    }
                }
            }
        `
        

        const result=await query({query:DEALS_OF_DEALERSHIP})
        console.log(result.data.dealsOfCertainDealership)
        expect(typeof result.data.dealsOfCertainDealership[0].deal_info.description).toBe('string')

    })


    test("dealership with certain car",async()=>{
        const DEALERSHIP_CERTAIN_CAR=gql`
            query DealershipWithCertainCar($carID:String!){
                dealershipWithCertainCar(carID:$carID){
                    dealership_email
                    dealership_name
                    dealership_info
                    dealership_email
                }                  
            }
        `

        const variables={
            carID:"6643a1e7f81da95cb3a5ff38"
        }

        const result=await query({query:DEALERSHIP_CERTAIN_CAR,variables})
        console.log(result.data.dealershipWithCertainCar)
        expect(typeof result.data.dealershipWithCertainCar[0].dealership_email)
    })


    test("vehicles owned by user",async()=>{
        const USER_OWNED_BY_USER=gql`
            query VehicleOwnedByUser($userEmail:String!){
                vehicleOwnedByUser(userEmail:$userEmail){
                    vehicle_info{
                        sold_price
                    }
                }
            }
        `

        const variables={
            userEmail:"test@gmail.com"
        }

        const result=await query({query:USER_OWNED_BY_USER,variables})
        console.log(result.data.vehicleOwnedByUser[0])
        expect(typeof result.data.vehicleOwnedByUser[0].vehicle_info.sold_price).toBe('number')
    })

    test("dels on certain car",async()=>{
        const DEALS_ON_CERTAIN_CAR=gql`
            query ViewAllDealsOnCertainCar($carID:String!){
                viewAllDealsOnCertainCar(carID:$carID){
                    deal_info{
                        discount
                    }
                }
            }
        `

        const variables={
            carID:"6643a1e7f81da95cb3a5ff38"
        }


        const result=await query({query:DEALS_ON_CERTAIN_CAR,variables})
        console.log( typeof result.data.viewAllDealsOnCertainCar[0].deal_info.discount)
        expect(result.data.viewAllDealsOnCertainCar[0].deal_info.discount).toEqual(10000)


    })

    test("dealership vehicle sold",async()=>{
        const DEALERSHIP_VEHICLE_SOLD=gql`
            query {
                viewDealershipVehiclesSold{
                    id
                    car_id {
                        id
                        type
                        name
                        model
                        car_info {
                            price
                            milage
                            description
                        }
                    }
                    vehicle_info{
                        sold_price
                        sold_date
                        description
                    }
                }
            }    
        `
     
        const expectedValue=200000
        const result=await query({query:DEALERSHIP_VEHICLE_SOLD})
        console.log(result)
        expect(result.data.viewDealershipVehiclesSold[0].vehicle_info.sold_price).toEqual(expectedValue)
    })

})


describe("testing all dealership mutations",()=>{
    test("deal completed",async()=>{
        const DEAL_COMPLETED=gql`
            mutation DealCompleted($dealershipEmail:String!,$carID:String!,$dealID:String!,$userEmail:String!,$sold_price:Int!,$sold_date:String!,$description:String!){
                dealCompleted(dealershipEmail:$dealershipEmail,carID:$carID,dealID:$dealID,userEmail:$userEmail,sold_price:$sold_price,sold_date:$sold_date,description:$description)
            }
        `

        const expectedValue="deal has been completed successfully"
        
        const variables={
            dealershipEmail:"shivanbd2019@gmail.com",
            carID:"6643a1e7f81da95cb3a5ff38",
            dealID:"664610ab1bb418cffd51ac63",
            sold_price:300000,
            userEmail:"test@gmail.com",
            sold_date:"1july",
            description:"it been a grea experience deling with you"
        }
        
        const result=await mutate({mutation:DEAL_COMPLETED,variables})
        console.log(result)
        expect(result.data.dealCompleted).toEqual(expectedValue)
    })


    test("add car to dealership",async()=>{
        const ADD_CAR_TO_DEALERSHIP=gql`
            mutation AddCarToDealership($carID:String!){
                addCarToDealership(carID:$carID)
            }
        `

        const expectedValue="successfully added to dealership"

        const variables={
            carID:"6643a1e7f81da95cb3a5ff38"
           
        }

        const result=await mutate({mutation:ADD_CAR_TO_DEALERSHIP,variables})
        console.log(result)
        expect(result.data.addCarToDealership).toEqual(expectedValue)
    })


    test("add deal to dealership",async()=>{
        const ADD_DEAL_TO_DEALERSHIP=gql`
            mutation AddDealToDealership($dealershipEmail:String!,$discount:Int!,$description:String!,$carID:String!){
                addDealToDealership(dealershipEmail:$dealershipEmail,discount:$discount,description:$description,carID:$carID)
            }
        `
        const expectedValue="deal added successfully"

        const variables={
            dealershipEmail:"shivanbd2019@gmail.com",
            discount:20000,
            description:"all man should serve",
            carID:"6643a1e7f81da95cb3a5ff38"
        }

        const result=await mutate({mutation:ADD_DEAL_TO_DEALERSHIP,variables})
        console.log(result)
        expect(result.data.addDealToDealership).toEqual(expectedValue)
    })

    test("get Categories",async()=>{
        const GET_CATEGORIES=gql`
            query {getCategories}
        `
        

        const result=await query({query:GET_CATEGORIES})
        console.log(result.data.getCategories)
        expect(typeof result.data.getCategories[0]).toBe('string')
    })

    test("delete Deal From Dealership",async()=>{
        const DELETE_DEAL_FROM_DEALERSHIP=gql`
            mutation DeleteDealFromDealership($dealID:String!){
                deleteDealFromDealership(dealID:$dealID)
            }
        `

        const variables={
            dealID:"664656fa035875d25c83310e"
        }

        const result=await mutate({mutation:DELETE_DEAL_FROM_DEALERSHIP,variables})
        console.log(result)
        expect(typeof result.data.deleteDealFromDealership).toBe("string")
    })

})