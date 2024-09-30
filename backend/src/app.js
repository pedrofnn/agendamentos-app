import express from "express";

const app = express();

//Pasar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({extended: false}));


export default app