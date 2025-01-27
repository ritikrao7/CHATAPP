const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatmodel");
const User = require("../models/userModel");


const accesschat = asyncHandler(async (req, res) => {

  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessages");

  isChat = await User.populate(isChat, {
    path: "latestMessages.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
const fetchchat=asyncHandler(async(req,res)=>{
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessages")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:"latestMessages.sender",
                select:"name pic email"
            });
            res.status(200).send(results);
        });
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
        
    }
});
const creategroup=asyncHandler(async(req,res)=>{
    if(!req.body.users||!req.body.name){
        return res.status(400).send({message:"please fill all the fields"});
    }
    var users=JSON.parse(req.body.users);
    if(users.length<2)
    {
        return res.status(400).send("more than 2 users are needed");
    }
    users.push(req.user);
    try {
        const groupchat=await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user,
        });
        const fullchat=await Chat.findOne({_id:groupchat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        res.status(200).json(fullchat);
        
    } catch (error) {
        
        res.status(400);
        throw new Error(error.message);
    }
});
const renamegroup=asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updatechat=await Chat.findByIdAndUpdate(chatId,{
        chatName,
    },{
        new :true,
    })
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!updatechat)
    {
        res.status(404);
        throw new Error("chat not found");

    }
    else {
        res.json(updatechat);
    }

});

const addtogroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;

    const added=await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    },{
        new:true,
    }).populate("users","-password")
    .populate("groupAdmin","-password");

    if(!added)
    {
        res.status(400);
        throw new Error("chat not found");
    }
    else {
        res.json(added);
    }
});

const removefromgroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const removed=await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId},
    },{
        new:true,
    }).populate("users","-password")
    .populate("groupAdmin","-password");

    if(!removed)
    {
        res.status(400);
        throw new Error("chat not found");
    }
    else {
        res.json(removed);
    }

});


module.exports={accesschat,fetchchat,creategroup,renamegroup,addtogroup,removefromgroup};