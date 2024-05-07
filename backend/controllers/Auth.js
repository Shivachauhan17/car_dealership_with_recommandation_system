// routes/authRoutes.js

const express = require('express');
const User = require('../models/user');
const Dealership=require('../models/dealership')
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken")
const jwtSecret = "mynameisajayshakyaIamFrommyownw"


const authControllers={
  createUser:async (req, res) => {
    console.log(req.body)
  const { name, email, phoneNumber, password,selectedRole,location,dealerInfo,userInfo } = req.body;

  if(!location || !name || !email || !phoneNumber || !password || !selectedRole){
    return  res.status(400).json({data:null,message:"input parameters arenot correctly given",success:false})
  }



  try {
    // Check if the email already exis
  

    if(selectedRole==="dealership"){
      console.log("as a dealer")
      if( !dealerInfo){
        return  res.status(400).json({data:null,message:"input parameters arenot correctly given",success:false})
      }
      const existingUser = await Dealership.findOne({ dealership_email:email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDealer=new Dealership({
        dealership_email:email,
        dealership_name:name,
        dealership_location:location,
        password:hashedPassword,
        dealership_info:dealerInfo
      })

      const savedDealer = await newDealer.save();
      return res.status(201).json({ message: 'User created successfully' });
    }
    else {
        if( !userInfo){
          return  res.status(400).json({data:null,message:"input parameters arenot correctly given",success:false})
        }
        const existingUser = await User.findOne({ user_email:email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser=new User({
          user_email:email,
          user_location:location,
          user_info:userInfo,
          password:hashedPassword
        })

        const saveUser=await newUser.save()
        return res.status(201).json({ message: 'User created successfully' });
    }

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

  login:async (req, res) => {
    console.log(req.body)
    const { email,password,selectedRole } = req.body;

    if(!email ||  !password || !selectedRole){
        return  res.status(400).json({data:null,message:"input parameters arenot correctly given",success:false})
    }


    try {
        if(selectedRole==="dealership"){
            console.log("as a dealer")
            const dealership=await Dealership.findOne({dealership_email:email})
            if(!dealership)
                return res.status(400).json({ success: false, message: 'User not found' });
            const isMatch=bcrypt.compare(password,dealership.password)
            if(!isMatch)
                return res.status(400).json({success: false, message: 'wrong credentials' })
            const userForToken = {
                username: dealership.dealership_email,
                type:"dealership",
                id: dealership.id,
            } 
            const token=await jwt.sign(userForToken,jwtSecret)
            res.status(201).json({authToken:token,error:null,success:true,message:"user validated"})

        }
        else{

            console.log("as a dealer")
            const user=await User.findOne({dealership_email:email})
            if(!user)
                return res.status(400).json({ success: false, message: 'User not found' });
            const isMatch=bcrypt.compare(password,user.password)
            if(!isMatch)
                return res.status(400).json({success: false, message: 'wrong credentials' })
            const userForToken = {
                username: user.user_email,
                type:"user",
                id: user.id,
            } 
            const token=await jwt.sign(userForToken,jwtSecret)
            res.status(201).json({authToken:token,error:null,success:true,message:"user validated"})
        }
    
        
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: 'Request processing failed' });
    }
}
}






module.exports=authControllers;