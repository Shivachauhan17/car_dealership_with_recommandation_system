const  {createTestClient} =require('apollo-server-testing')
const  {ApolloServer,gql} =require('apollo-server')
const {resolvers,typeDefs}=require('../index')
const connectMongo=require('../utils/connect_db')
const mongoose=require('mongoose')

const server=new ApolloServer({
    typeDefs,
    resolvers
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
            query DealsOfCertainDealership($dealershipEmail:String!){
                dealsOfCertainDealership(dealershipEmail:$dealershipEmail){
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
        const variables={
            dealershipEmail:"shivanbd2019@gmail.com"
        }

        const result=await query({query:DEALS_OF_DEALERSHIP,variables})
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
            query ViewDealershipVehiclesSold($dealershipEmail:String!){
                viewDealershipVehiclesSold(dealershipEmail:$dealershipEmail){
                    vehicle_info{
                        sold_price
                        sold_date
                        description
                    }
                }
            }    
        `
        const variables={
            dealershipEmail:"shivanbd2019@gmail.com"
        }

        const expectedValue=200000
        const result=await query({query:DEALERSHIP_VEHICLE_SOLD,variables})
        console.log(result)
        expect(result.data.viewDealershipVehiclesSold[0].vehicle_info.sold_price).toEqual(expectedValue)
    })

})