const connectMongo=require('./connect_db')
const Car=require('../models/car')



const cars=
    [
        {
          "type": "SUV",
          "name": "Toyota RAV4",
          "model": 2021,
          "car_info": {
            "milage": 12,
            "price": 30000,
            "description": "A reliable and spacious SUV with great fuel efficiency."
          }
        },
        {
          "type": "Sedan",
          "name": "Honda Accord",
          "model": 2020,
          "car_info": {
            "milage": 18,
            "price": 25000,
            "description": "A comfortable sedan with advanced safety features."
          }
        },
        {
          "type": "Truck",
          "name": "Ford F-150",
          "model": 2019,
          "car_info": {
            "milage": 25,
            "price": 35000,
            "description": "A powerful truck with a high towing capacity."
          }
        },
        {
          "type": "Hatchback",
          "name": "Volkswagen Golf",
          "model": 2022,
          "car_info": {
            "milage": 5,
            "price": 22000,
            "description": "A compact and sporty hatchback with excellent handling."
          }
        },
        {
          "type": "Coupe",
          "name": "Chevrolet Camaro",
          "model": 2021,
          "car_info": {
            "milage": 9,
            "price": 35000,
            "description": "A high-performance coupe with a stylish design."
          }
        },
        {
          "type": "Convertible",
          "name": "Mazda MX-5 Miata",
          "model": 2021,
          "car_info": {
            "milage": 7,
            "price": 32000,
            "description": "A fun and sporty convertible with great handling."
          }
        },
        {
          "type": "Minivan",
          "name": "Chrysler Pacifica",
          "model": 2020,
          "car_info": {
            "milage": 15,
            "price": 31000,
            "description": "A spacious and versatile minivan with advanced features."
          }
        },
        {
          "type": "SUV",
          "name": "BMW X5",
          "model": 2021,
          "car_info": {
            "milage": 13,
            "price": 60000,
            "description": "A luxurious SUV with powerful performance and premium features."
          }
        },
        {
          "type": "Sedan",
          "name": "Mercedes-Benz C-Class",
          "model": 2021,
          "car_info": {
            "milage": 10,
            "price": 55000,
            "description": "A premium sedan with advanced technology and a comfortable ride."
          }
        },
        {
          "type": "Truck",
          "name": "Ram 1500",
          "model": 2018,
          "car_info": {
            "milage": 22,
            "price": 34000,
            "description": "A rugged truck with excellent towing and hauling capabilities."
          }
        },
        {
          "type": "Hatchback",
          "name": "Hyundai Veloster",
          "model": 2020,
          "car_info": {
            "milage": 11,
            "price": 21000,
            "description": "A unique hatchback with a sporty design and peppy performance."
          }
        },
        {
          "type": "Coupe",
          "name": "Ford Mustang",
          "model": 2019,
          "car_info": {
            "milage": 9,
            "price": 37000,
            "description": "An iconic coupe with powerful performance and a sleek design."
          }
        },
        {
          "type": "Convertible",
          "name": "Audi A5",
          "model": 2021,
          "car_info": {
            "milage": 7,
            "price": 45000,
            "description": "A stylish convertible with a luxurious interior and smooth ride."
          }
        },
        {
          "type": "Minivan",
          "name": "Toyota Sienna",
          "model": 2022,
          "car_info": {
            "milage": 5,
            "price": 35000,
            "description": "A versatile minivan with plenty of space and advanced safety features."
          }
        },
        {
          "type": "SUV",
          "name": "Nissan Rogue",
          "model": 2021,
          "car_info": {
            "milage": 16,
            "price": 29000,
            "description": "A compact SUV with a comfortable interior and efficient performance."
          }
        },
        {
          "type": "Sedan",
          "name": "Kia Optima",
          "model": 2020,
          "car_info": {
            "milage": 21,
            "price": 24000,
            "description": "A stylish sedan with a spacious interior and advanced features."
          }
        },
        {
          "type": "Truck",
          "name": "Chevrolet Silverado",
          "model": 2019,
          "car_info": {
            "milage": 24,
            "price": 37000,
            "description": "A dependable truck with a powerful engine and plenty of cargo space."
          }
        },
        {
          "type": "Hatchback",
          "name": "Subaru Impreza",
          "model": 2021,
          "car_info": {
            "milage": 13,
            "price": 23000,
            "description": "A compact hatchback with all-wheel drive and a comfortable interior."
          }
        },
        {
          "type": "Coupe",
          "name": "BMW 4 Series",
          "model": 2020,
          "car_info": {
            "milage": 11,
            "price": 50000,
            "description": "A luxury coupe with sporty performance and premium features."
          }
        },
        {
          "type": "Convertible",
          "name": "Mazda MX-5 Miata",
          "model": 2021,
          "car_info": {
            "milage": 8,
            "price": 32000,
            "description": "A fun and sporty convertible with great handling."
          }
        },
        {
          "type": "Minivan",
          "name": "Chrysler Pacifica",
          "model": 2020,
          "car_info": {
            "milage": 12,
            "price": 31000,
            "description": "A spacious and versatile minivan with advanced features."
          }
        },
        {
          "type": "SUV",
          "name": "Toyota RAV4",
          "model": 2021,
          "car_info": {
            "milage": 8,
            "price": 30000,
            "description": "A reliable and spacious SUV with great fuel efficiency."
          }
        },
        {
          "type": "Sedan",
          "name": "Honda Accord",
          "model": 2020,
          "car_info": {
            "milage": 14,
            "price": 25000,
            "description": "A comfortable sedan with advanced safety features."
          }
        },
        {
          "type": "Truck",
          "name": "Ford F-150",
          "model": 2019,
          "car_info": {
            "milage": 17,
            "price": 35000,
            "description": "A powerful truck with a high towing capacity."
          }
        },
        {
          "type": "Hatchback",
          "name": "Volkswagen Golf",
          "model": 2022,
          "car_info": {
            "milage": 4,
            "price": 22000,
            "description": "A compact and sporty hatchback with excellent handling."
          }
        },
        {
          "type": "Coupe",
          "name": "Chevrolet Camaro",
          "model": 2021,
          "car_info": {
            "milage": 10,
            "price": 35000,
            "description": "A high-performance coupe with a stylish design."
          }
        },
        {
          "type": "Convertible",
          "name": "Mazda MX-5 Miata",
          "model": 2021,
          "car_info": {
            "milage": 7,
            "price": 32000,
            "description": "A fun and sporty convertible with great handling."
          }
        },
        {
          "type": "Minivan",
          "name": "Chrysler Pacifica",
          "model": 2020,
          "car_info": {
            "milage": 6,
            "price": 31000,
            "description": "A spacious and versatile minivan with advanced features."
          }
        },
        {
          "type": "SUV",
          "name": "BMW X5",
          "model": 2021,
          "car_info": {
            "milage": 13,
            "price": 60000,
            "description": "A luxurious SUV with powerful performance and premium features."
          }
        }     
]

const store=async()=>{
    await connectMongo() 
    await Car.insertMany(cars)
}

module.exports=store