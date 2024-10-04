import express from "express";
import{
  todosAgendamentos, 
  criarAgendamento, 
  agendamentoPorId, 
  atualizarAgendamento, 
  deleteAgendamento
} from '../controllers/agendamentoController.js'
import objectIdValidator from "../middlewere/objectIdValidator.js"

const agendamentoRoute = express.Router()

agendamentoRoute.route('/')
  .get(todosAgendamentos)
  .post(criarAgendamento);
agendamentoRoute.route('/:id')
  .get(objectIdValidator, agendamentoPorId)
  .put(objectIdValidator, atualizarAgendamento)
  .delete(objectIdValidator, deleteAgendamento);

export default agendamentoRoute