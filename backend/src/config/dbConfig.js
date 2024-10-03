import mongoose from "mongoose";
const connectDB = async() => { 
  try {
    await mongoose.connect(process.env.MONGODB_URL_STRING);
    
  } catch (error) {
    console.error(error.message)
  }
};


export default connectDB