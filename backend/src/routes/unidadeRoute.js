import express from 'express'
import {
  listaUnidades, 
  criarUnidade, 
  unidadePorId, 
  atualizarUnidade, 
  deleteUnidade
} from '../controllers/unidadeController.js'
import objectIdValidator from '../middlewere/objectIdValidator.js';

const unidadeRoute = express.Router();

unidadeRoute.route('/')
  .get(listaUnidades)
  .post(criarUnidade);
unidadeRoute.route('/:id')
  .get(objectIdValidator, unidadePorId)
  .put(objectIdValidator, atualizarUnidade)
  .delete(objectIdValidator, deleteUnidade);

export default unidadeRoute