import { useState } from 'react'
import AgendamentoForm from './components/AgendamentoForm'
import TabelaAgendamento from './components/TabelaAgendamento'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
import {AddIcon} from './components/icons/AddIcon'

import agendamentosDb from './AgendamentosDB'

const App = ()=> {
  const [openModal, setModal] = useState(false)
  const [updateForm, setUpdateForm] = useState(null)
  const [agendamentos, setAgendamentos] = useState(agendamentosDb);

  const deleteAgendamento = (agendamento) => {
    let findAgendamento = agendamentos.find((element) => element === agendamento);
    if(findAgendamento !== -1){
      const novoAgendamento = agendamentos.filter((agendamento) => agendamento !== findAgendamento)
      setAgendamentos(novoAgendamento)
      console.log(agendamentos)
    }  
  }

  const editAgendamento = (agendamento) => {
    setModal(true)
    setUpdateForm(agendamento)
    console.log(agendamento)
  }

  const addAgendamento = (novoAgendamento) => {
    if(!updateForm){
      console.log("Não tem update form")
      setAgendamentos([...agendamentos, novoAgendamento])
    } else{
      console.log("Tem update form")
      setAgendamentos(agendamentos.map((agendamento) => agendamento === updateForm ? novoAgendamento : agendamento));
      setUpdateForm(null);
    }
    setModal(false)
  }
    return (
    <div className='min-h-screen dark:bg-gray-900 flex flex-row'>
      <NavBar/>
      <div className='p-4 sm:ml-28 mt-20 grow'> 
        <div className='flex justify-between mx-auto mb-5 table-div'>
          <h2 className='text-3xl font-bold dark:text-gray-300 text-gray-800'>Tabela de Agendamentos</h2>
          <button className='block p-2 bg-blue-500 border-none rounded-lg text-white dark:text-gray-100 hover:bg-blue-600 active:bg-blue-700 focus:outline-2 focus:outline focus:outline-blue-300 active:outline-none' onClick={()=> {setModal(true);setUpdateForm(null)}}><AddIcon/></button>
        </div>
        {openModal && <Modal setModal={setModal}><AgendamentoForm agendamentoSubmit={addAgendamento} updateForm={updateForm}/></Modal>}
        <TabelaAgendamento editAgendamento={editAgendamento} deleteAgendamento={deleteAgendamento} agendamentos={agendamentos}/>
      </div>
    </div>  
  )
}

export default App
