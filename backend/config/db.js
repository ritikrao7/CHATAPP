const mongoose=require('mongoose')
// require('dotenv').config();

const MONGODB_URL='mongodb+srv://user2000:user2000@cluster0.iiwap4n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// console.log(MONGODB_URL);

const connectDB=async ()=>{

    try {
        const conn=await mongoose.connect(MONGODB_URL)
        console.log(`mongo connected :${conn.connection.host}`);
        
    } catch (error) {
        console.log(`error is :${error.message}`);
        process.exit(1);
        
    }
};
module.exports=connectDB;