const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const generateToken=require('../config/generateToken');

const regiseteruser=asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new Error("enter all the fields correctly");
    }

    const userExist=await User.findOne({email});
    if(userExist)
    {
        res.status(400);
        throw new Error("user already exist");
    }

    const user=await User.create({
        name,email,password,pic,
    });
    if(user){
        res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          password:user.password,
          pic:user.pic,
          token:generateToken(user._id),
        });

    }
    else{
        res.status(400);
        throw new Error("failed to create the user");
    }
});

const authuser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user&&(await user.matchpassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }
    else{
        res.status(400);
        throw new Error("invalid email or password");
    }
});
const allusers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }:{};
    console.log(keyword);
    const users=await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})


module.exports={regiseteruser,authuser,allusers};

