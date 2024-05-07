const router= require('express').Router();
const authController=require('../Controllers/Auth')

router.post("/login",authController.login)
router.post("/createUser",authController.createUser)


module.exports=router
