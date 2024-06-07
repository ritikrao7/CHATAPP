const express=require('express');
const { protect } = require('../middleware/authmiddleware');
const {accesschat,fetchchat,creategroup,renamegroup,addtogroup,removefromgroup}=require('../controllers/chatControllers');


const router=express.Router();

router.route("/").post(protect, accesschat);
router.route("/").get(protect,fetchchat);
router.route("/group").post(protect,creategroup);
router.route("/grouprename").put(protect,renamegroup);

router.route("/groupadd").put(protect,addtogroup);
router.route("/groupremove").put(protect,removefromgroup);
module.exports=router;