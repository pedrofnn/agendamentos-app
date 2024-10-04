import Agendamento from '../models/agendamentoModel.js';
import Unidade from '../models/unidadeModel.js';
import Atendente from '../models/atendenteModel.js';


const validarHorarioAgendamento = async(agendamento) => {
  try {
    
  } catch (error) {
    
  }
}

//Lista com todos os agendamentos
//Método GET
//Rota /agendamentos
const todosAgendamentos = async(req, res) => {
  try {
    const listaAgendamentos = await Agendamento.find()
      .populate([{path: 'unidade', select: 'nome'},{path: 'atendente', select: 'nome'}]);
      return res.status(200).json(listaAgendamentos);
  } catch (error) {
    return res.status(500).json({mensagem: error.message})
  }
}

//Criação de novo agendamento
//Método POST
//Rota /agendamentos
const criarAgendamento = async(req, res) => {
  const {horario, data, pacienteNome, atendente, unidade} = req.body
  if(!horario || !data || !pacienteNome || !atendente || !unidade){
    res.status(400).json({mensagem: "Preencha todos os campos"})
  } else{
    try{
      const novoAgendamento = new Agendamento({
        horario,
        data,
        pacienteNome,
        atendente,
        unidade,
      })
      const findAtendente = await Atendente.findById(novoAgendamento.atendente);
      if(!findAtendente){
        return res.status(404).json({mensagem: "Atendente não econtrada"})
      } else {
        const findUnidade = await Unidade.findById(novoAgendamento.unidade);
        if(!findUnidade){
          return res.status(404).json({mensagem: "Unidade não econtrada"})
        } else {
          await novoAgendamento.save();
          return res.status(201).json(novoAgendamento)
        }
      }
    }catch (error){
      console.error(error)
      return res.status(500).json({mensagem: error.message})
    }
  }
};

//Procurar agendamento por ID
//Método GET
//Rota /agendamentos/:id
const agendamentoPorId = async(req, res) => {
  try {
    const findAgendamento = await Agendamento.findById(req.params.id)
      .populate([{path: 'unidade', select: 'nome'},{path: 'atendente', select: 'nome'}]);
    if(findAgendamento){
      return res.status(200).json(findAgendamento)
    } else {
      return res.status(404).json({mensagem: `Não foi encontrado o agendamento com id: ${req.params.id}`})
    }
  }catch (error){
    return res.status(500).json({mensagem: error.message})
  }
};

//Atualizar agendamento por ID
//Método PUT
//Rota /agendamentos/:id
const atualizarAgendamento = async(req, res) => {
  const {horario, data, pacienteNome, atendente, unidade} = req.body
  if(!horario && !data && !pacienteNome && !atendente && !unidade){
    return res.status(400).json({mensagem: "Preencha pelo menos um campo para atualizar"})
  }
  const updateAgendamento = new Agendamento({
    _id: req.params.id,
    horario,
    data,
    pacienteNome,
    atendente,
    unidade
  });
  try{
    const updatedAgendamento = await Agendamento.findByIdAndUpdate(req.params.id, updateAgendamento,{new: true})
    if(updatedAgendamento){
      return res.status(200).json({updatedAgendamento})
    } else {
      return res.status(404).json({mensagem: `Não foi possível atualizar o agendamento de id: ${req.params.id}`})
    }
  } catch (error){
    return res.status(500).json({mensagem: error.message})
  }
}

//Deletar agendamento por ID
//Método DELETE
//Rota /agendamentos/:id
const deleteAgendamento = async(req, res) => {
  try {
    const deletedAgendamento = await Agendamento.findByIdAndDelete(req.params.id);
    if(deletedAgendamento) {
      return res.status(200).json({mensagem: `Deletado com sucesso o agendamento de id: ${req.params.id}`})
    } else {
      return res.status(404).json({mensagem: `Não foi encontrado o agendamento com id: ${req.params.id}`})
    }
  } catch(error){
    return res.status(500).json({mensagem: error.message})
  }
}

export {todosAgendamentos, criarAgendamento, agendamentoPorId, atualizarAgendamento, deleteAgendamento}