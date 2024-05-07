const router= require('express').Router();
const authController=require('../Controllers/Deal')

router.post("/add_deal_to_dealership",authController.add_deal_to_dealership)
router.post("/add_dealership",authController.add_dealership)
router.get("/cars",authController.cars)

router.get("/cars_dealership",authController.cars_dealership)
router.post("/deal_complete",authController.deal_complete)
router.get("/deal_of_cars",authController.deal_of_cars)
router.get("/dealership_of_car",authController.dealership_of_car)
router.get("/dealership_sold",authController.dealership_sold)
router.get("/deals_of_dealership",authController.deals_of_dealership)
router.get("/vehicle_of_user",authController.vehicle_of_user)

// router.post("/createUser",authController.createUser)


module.exports=router
