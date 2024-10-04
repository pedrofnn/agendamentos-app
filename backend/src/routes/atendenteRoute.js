import express from 'express';
import {
  listaAtendentes, 
  criarAtendente, 
  atendentePorId, 
  atualizarAtendente, 
  deleteAtendente
} from '../controllers/atendenteController.js'
import objectIdValidator from '../middlewere/objectIdValidator.js';

const atendenteRoute = express.Router();

atendenteRoute.route('/')
  .get(listaAtendentes)
  .post(criarAtendente);
atendenteRoute.route('/:id')
  .get(objectIdValidator, atendentePorId)
  .put(objectIdValidator, atualizarAtendente)
  .delete(objectIdValidator, deleteAtendente);

export default atendenteRoute