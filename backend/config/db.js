import mongoose from "mongoose";
const connectDb=async(params)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to db");
    }catch(error){
        console.log("error while connecting to db",error);
    }
}
export default connectDb;