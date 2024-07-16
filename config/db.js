const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("server connected");
    }
    catch(error){
        console.log(error);
    }
}
module.exports = connectDB