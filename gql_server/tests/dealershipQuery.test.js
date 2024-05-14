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

})