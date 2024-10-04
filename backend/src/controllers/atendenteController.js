import Atendente from "../models/atendenteModel.js";
import validateBoolean from '../utils/validateBoolean.js';

//Lista com todos atendentes
//Método GET
//Route '/atendente'
const listaAtendentes = async(req, res) => {
  try {
    const todosAtendentes = await Atendente.find();
    return res.status(200).json(todosAtendentes);
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Criar novo atendente
//Método POST
//Route /atendente
const criarAtendente = async(req, res) => {
  const {nome, ativa} = req.body;
  //Checkar campo Nome
  if(!nome){
    return res.status(400).json({mensagem: "Preencha o campo nome"});
  }
  //Checkar Status === Boolean
  const ativaValor = validateBoolean(ativa);
  if(ativa !== undefined &&  typeof ativaValor !== 'boolean'){
    return res.status(400).json({mensagem: "Status deve ser um valor booleano ex:(true,false)"});
  }

  const novoAtendente = new Atendente({
    nome,
    ativa: ativa ? ativaValor : true
  });
  try {
    const atendenteCriado = await novoAtendente.save();
    if(atendenteCriado){
      return res.status(201).json(atendenteCriado);
    } else{
      return res.status(400).json({mensagem: "Não foi possível criar novo atendente"});
    }
  }catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Pesquisar atendente por ID
//Método GET
//Route '/atendente/:id'
const atendentePorId = async(req, res) => {
  try {
    const findAtendente = await Atendente.findById(req.params.id)
    if(findAtendente){
      return res.status(200).json(findAtendente);
    }else {
      return res.status(404).json({mensagem: `Não foi possível encontar atendente com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}

//Atualizar atendente por ID
//Método PUT
//Route '/atendente/:id'
const atualizarAtendente = async(req, res) => {
  const {nome, ativa} = req.body

  // Checkar se todos os campos estão vazios
  if (!nome && ativa === undefined) {
    return res.status(400).json({ mensagem: "Preencha pelo menos um campo para atualizar" });
  }

  // Checkar se status é booleano
  const ativaValor = validateBoolean(ativa);
  if(ativa !== undefined && typeof ativaValor !== 'boolean'){
    return res.status(400).json({mensagem: "Status deve ser um valor booleano ex:(true,false)"});
  }

  const updateAtendente = {
    _id: req.params.id,
    nome,
    ...(ativa !== undefined && { ativa: ativaValor })
  };
  try {
    const updatedAtendente = await Atendente.findByIdAndUpdate(req.params.id, updateAtendente, {new: true});
    if(updatedAtendente){
      return res.status(200).json(updatedAtendente);
    } else{
      return res.status(404).json({mensagem: `Não foi possível atualizar Atendente com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
}


//Deletar atendente por ID
//Método DELETE
//Route '/atendente/:id'
const deleteAtendente = async(req, res) => {
  try {
    
    const deletedAtendente = await Atendente.findByIdAndDelete(req.params.id)
    if(deletedAtendente){
      return res.status(200).json({mensagem: `Deletado o atendente com id ${req.params.id}`})
    } else {
      return res.status(404).json({mensagem: `Não foi possível deletar Atendente com id: ${req.params.id}`})
    }
  } catch (error) {
    return res.status(500).json({mensagem: error.message});
  }
  
}

export {listaAtendentes, criarAtendente, atendentePorId, atualizarAtendente, deleteAtendente}