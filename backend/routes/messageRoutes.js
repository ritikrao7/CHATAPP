const express=require('express')
const {protect}=require('../middleware/authmiddleware');
const {sendmessage,allmessage}=require('../controllers/messageControllers')


const router=express.Router();

router.route('/').post(protect,sendmessage);
router.route('/:chatId').get(protect,allmessage);

module.exports=router;

