const express=require('express');
const {regiseteruser, authuser,allusers}=require('../controllers/userControllers');
const {protect}=require('../middleware/authmiddleware');

const router=express.Router();
router.route("/").post(regiseteruser).get(protect,allusers);
router.route("/login").post(authuser);


module.exports=router;
