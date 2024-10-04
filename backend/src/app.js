import express from "express";
import {connectDB, connectionListeners} from "./config/dbConfig.js";
import agendamentoRoute from "./routes/agendamentoRoute.js";
import atendenteRoute from "./routes/atendenteRoute.js";
import unidadeRoute from "./routes/unidadeRoute.js";

//Conxão com mongoDB
connectionListeners();
connectDB();

const app = express();

//Pasar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rotas
app.use('/agendamentos', agendamentoRoute);
app.use('/unidades', unidadeRoute);
app.use('/atendentes', atendenteRoute);



export default app