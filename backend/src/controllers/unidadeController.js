import Unidade from "../models/unidadeModel.js";
import validateBoolean from '../utils/validateBoolean.js';

//Lista com todas unidades
//Método GET
//Route '/unidade'
const listaUnidades = async(req, res) => {
  try {
    const todosUnidades = await Unidade.find();
    return res.status(200).json(todosUnidades);
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Criar nova unidade
//Método POST
//Route /unidade
const criarUnidade = async(req, res) => {
  const {nome, ativa} = req.body;
  //Confirmar campo Nome está vazio
  if(!nome){
    return res.status(400).json({mensagem: "Preencha o campo nome"});
  }
  //Confirmar status é um valor booleano
  const ativaValor = validateBoolean(ativa);
  if(ativa !== undefined && typeof ativaValor !== 'boolean'){
    return res.status(400).json({mensagem: "Status deve ser um valor booleano ex:(true,false)"});
  }

  const novaUnidade = new Unidade({
    nome,
    ativa: ativa !== undefined ? ativaValor : true
  });
  try {
    const unidadeCriado = await novaUnidade.save();
    if(unidadeCriado){
      return res.status(201).json(unidadeCriado);
    } else{
      return res.status(400).json({mensagem: "Não foi possível criar nova unidade"});
    }
  }catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Pesquisar unidade por ID
//Método GET
//Route '/unidade/:id'
const unidadePorId = async(req, res) => {
  try {
    const findUnidade = await Unidade.findById(req.params.id)
    if(findUnidade){
      return res.status(200).json(findUnidade);
    }else {
      return res.status(404).json({mensagem: `Não foi possível encontar unidade com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Atualizar unidade por ID
//Método PUT
//Route '/unidade/:id'
const atualizarUnidade = async(req, res) => {
  const {nome, ativa} = req.body

  //Confirmar se todos os campos estão vazios
  if (!nome && ativa === undefined) {
    return res.status(400).json({ mensagem: "Preencha pelo menos um campo para atualizar" });
  }

  //Confirmar se status é booleano
  const ativaValor = validateBoolean(ativa);
  if(ativa !== undefined && typeof ativaValor !== 'boolean'){
    return res.status(400).json({mensagem: "Status deve ser um valor booleano ex:(true,false)"});
  }

  const updateUnidade = {
    _id: req.params.id,
    nome,
    ...(ativa !== undefined && { ativa: ativaValor })
  };
  try {
    const updatedUnidade = await Unidade.findByIdAndUpdate(req.params.id, updateUnidade, {new: true});
    if(updatedUnidade){
      return res.status(200).json(updatedUnidade);
    } else{
      return res.status(404).json({mensagem: `Não foi encontrado a unidade com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}


//Deletar unidade por ID
//Método DELETE
//Route '/unidade/:id'
const deleteUnidade = async(req, res) => {
  try {
    //Procurar Agendamentos com unidade antes de excluir
    const findAgendamentosComAtendente = await Agendamento.find({atendente: req.params.id})
    if(findAgendamentosComAtendente.length > 0){
      return res.status(400).json({mensagem: "Exclua esses agendamentos antes de excluir essa unidade", agendamento: findAgendamentosComAtendente})
    }
    const deletedUnidade = await Unidade.findByIdAndDelete(req.params.id)
    if(deletedUnidade){
      return res.status(200).json({mensagem: `Deletado a unidade com id ${req.params.id}`})
    } else {
      return res.status(404).json({mensagem: `Não foi encontrado a unidade com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
  
}

export {listaUnidades, criarUnidade, unidadePorId, atualizarUnidade, deleteUnidade}