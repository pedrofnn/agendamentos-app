import express from "express";
import mongoose from 'mongoose'
import 'dotenv/config';
import connectDB from "./config/dbConfig.js";

//Conxão com mongoDB
connectDB();
mongoose.connection.on('error', (error) => {
  console.error('Erro na conexão',error)
});
mongoose.connection.once('open', () => {
  console.log("Conectado ao MongoDB")
});





const app = express();

//Pasar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rotas
//app.use('/agendamentos', agendamentosRoute);
//app.use('/unidades', unidadesRoute);
//app.use('/atendentes', atendentesRoute);



export default app