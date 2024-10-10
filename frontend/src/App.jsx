import { useState, useEffect } from 'react'
import AgendamentoForm from './components/AgendamentoForm'
import TabelaAgendamento from './components/TabelaAgendamento'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
import {AddIcon} from './components/icons/AddIcon'
import axios from 'axios'

const App = ()=> {
  const [openModal, setModal] = useState(false);
  const [updateForm, setUpdateForm] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [atendentes, setAtendentes] = useState([]);

  //GET Request pegar agendamentos
  const fetchAgendamentos = async () => {
    try {
      const res = await axios.get('/api/agendamento');
      setAgendamentos(res.data);
    } catch (erro) {
      console.error(erro.message);
    }
  };

  //GET Request pegar unidades
  const fetchUnidades = async () =>{
    try {
      const res = await axios.get('/api/unidade');
      setUnidades(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  //GET Request pegar atendentes
  const fetchAtendentes = async () =>{
    try {
      const res = await axios.get('/api/atendente');
      setAtendentes(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  
  //POST Request Criar agendamento
  const addAgendamento = async(novoAgendamento) => {
    try {
      const res = await axios.post('/api/agendamento', novoAgendamento,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await fetchAgendamentos();
    } catch (error) {
      console.error(error.message)
    }
    setModal(false)
  }

  //DELETE Request deletar agendamento
  const deleteAgendamento = async(agendamentoId) => {
    try {
      const res = await axios.delete(`/api/agendamento/${agendamentoId}`);
      await fetchAgendamentos();
    } catch (error) {
      console.error(error.message)
    } 
  }
  //PUT Request atualizar agendamento
  const updateAgendamento = async(agendamento, agendamentoId) => {
    try {
      const res = await axios.put(`/api/agendamento/${agendamentoId}`, agendamento,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      await fetchAgendamentos();
    } catch (error) {
      console.error(error.message)
    }
    setUpdateForm(null);
    setModal(false);
  }

  //Prencher formulário ao editar
  const formFill = (agendamento) => {
    setModal(true)
    setUpdateForm(agendamento)
  }

  //Inicializar fetch
  useEffect(() => {
    fetchAgendamentos();
    fetchUnidades();
    fetchAtendentes();
  }, []);
    return (
    <div className='min-h-screen dark:bg-gray-900 flex flex-row'>
      <NavBar/>
      <div className='p-4 sm:ml-28 mt-20 grow'> 
        <div className='flex justify-between mx-auto mb-5 w-[950px]'>
          <h2 className='text-3xl font-bold dark:text-gray-300 text-gray-800'>Tabela de Agendamentos</h2>
          <button className='block p-2 bg-blue-500 border-none rounded-lg text-white dark:text-gray-100 hover:bg-blue-600 active:bg-blue-700 focus:outline-2 focus:outline focus:outline-blue-300 active:outline-none mr-[50px]' onClick={()=> {setModal(true);setUpdateForm(null)}}><AddIcon/></button>
        </div>
        {openModal && <Modal setModal={setModal}><AgendamentoForm agendamentoSubmit={addAgendamento} onAgendamentoUpdate={updateAgendamento} updateForm={updateForm} unidades={unidades} atendentes={atendentes}/></Modal>}
        <TabelaAgendamento onEdit={formFill} deleteAgendamento={deleteAgendamento} agendamentos={agendamentos}/>
      </div>
    </div>  
  )
}

export default App
