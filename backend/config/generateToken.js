const jwt=require('jsonwebtoken')

const generateToken= (id)=>{
    return jwt.sign({id},'yadav',{
        expiresIn:'30d',
    });
};

module.exports=generateToken;