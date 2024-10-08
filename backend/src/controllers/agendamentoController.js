import Agendamento from '../models/agendamentoModel.js';
import Unidade from '../models/unidadeModel.js';
import Atendente from '../models/atendenteModel.js';



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

  //Confirmar se todos os campos estão preenchidos
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
      //Procurar se existe atendente por ID
      const findAtendente = await Atendente.findById(novoAgendamento.atendente);
      if(!findAtendente){
        return res.status(404).json({mensagem: "Atendente não econtrada"})
      } 

      //Procurar se existe unidade por ID
      const findUnidade = await Unidade.findById(novoAgendamento.unidade);
      if(!findUnidade){
        return res.status(404).json({mensagem: "Unidade não econtrada"})
      } 

      //Procurar agendamentos na mesma unidade e no mesmo horário
      const findAgendamentos = await Agendamento.find({
        horario: novoAgendamento.horario, 
        data: novoAgendamento.data, 
        unidade: novoAgendamento.unidade
      });
      if(findAgendamentos.length > 0){
        return res.status(400).json({mensagem: "Já existe agendamento nesse horário"})
      } else{
        //Salvar novo agendamento
        await novoAgendamento.save();
        return res.status(201).json(novoAgendamento)
      }
    }catch (error){
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
      return res.status(404).json({mensagem: `Não foi possível encontar o agendamento com id: ${req.params.id}`})
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

  //Confirmar se todos os campos estão preenchidos
  if(!horario || !data || !pacienteNome || !atendente || !unidade){
    return res.status(400).json({mensagem: "Preencha todos os campos"})
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
    //Procurar agendamentos na mesma unidade e no mesmo horário
    const findAgendamentos = await Agendamento.find({
      _id: {$ne: updateAgendamento._id}, //Exclui o id na procura
      horario: updateAgendamento.horario, 
      data: updateAgendamento.data, 
      unidade: updateAgendamento.unidade
    })
    if(findAgendamentos.length > 0){
      return res.status(400).json({mensagem: "Já existe agendamento nesse horário"})
    } 

    //Atualiza o agendamento
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
      return res.status(200).json({mensagem: `Deletado o agendamento de id: ${req.params.id}`})
    } else {
      return res.status(404).json({mensagem: `Não foi encontrado o agendamento com id: ${req.params.id}`})
    }
  } catch(error){
    return res.status(500).json({mensagem: error.message})
  }
}

export {todosAgendamentos, criarAgendamento, agendamentoPorId, atualizarAgendamento, deleteAgendamento}