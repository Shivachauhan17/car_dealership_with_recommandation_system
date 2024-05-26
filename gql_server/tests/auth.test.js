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


beforeAll(async () => {
    connectMongo()
  });
  
  // Disconnect from MongoDB database
  afterAll(async () => {
    await mongoose.disconnect();
  });

describe('Testing auth mutations',()=>{
    
    test('create User mutation test',async()=>{
        const CREATE_USER_MUTATION=gql`
        mutation Register($name:String!,$email:String!,$phoneNumber:String!,$password:String!,$selectedRole:String!,$location:String!,$dealerInfo:String!,$userInfo:String!){
            register(name:$name,email:$email,phoneNumber:$phoneNumber,password:$password,selectedRole:$selectedRole,location:$location,dealerInfo:$dealerInfo,userInfo:$userInfo)
        }
        `
        const expectedValue="dealership created successfully"
        const variables={
            name:"shiva chauhan",
            email:"shivanbd2019@gmail.com",
            phoneNumber:"812648648723",
            password:"Shiva@123",
            selectedRole:"dealership",
            location:"delhi",
            dealerInfo:"i have experience oon 5 years in dealership you can check the review  of my dealership here",
            userInfo:""
        }

        const result=await mutate({mutation:CREATE_USER_MUTATION,variables})
        expect(result.data.register).toEqual(expectedValue)
    })

    test('login mutation test',async()=>{
        const LOGIN_MUTATION=gql`
        mutation Login($email:String!,$password:String!,$selectedRole:String!){
            login(email:$email,password:$password,selectedRole:$selectedRole){
                msg
                token
            }
        }
        `
        const expectedValue="dealership successfully verified logging you in"
        const variables={
            email:"shivanbd2019@gmail.com",
            password:"Shiva@123",
            selectedRole:"dealership"
        }

        const result=await mutate({mutation:LOGIN_MUTATION,variables})
        console.log(result)
        if(result.data!==undefined){
            console.log(result.data.login.token)
            expect(result.data.login.msg).toEqual(expectedValue)
        }
    })

})