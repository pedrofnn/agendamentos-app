import mongoose from "mongoose";
const connectDB = async() => { 
  try {
    await mongoose.connect(process.env.MONGODB_URI_STRING);
  } catch (error) {
    console.error(error.message)
  }
};

const connectionListeners = ()=>{
  mongoose.connection.on('error', (error) => {
    console.error('Erro na conexão',error)
  });
  mongoose.connection.once('open', () => {
    console.log("Conectado ao MongoDB")
  });
}


export {connectDB, connectionListeners}