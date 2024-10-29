import AgendamentoForm from '../components/AgendamentoForm'
import TabelaAgendamento from '../components/TabelaAgendamento'
import Modal from '../components/Modal'
import {AddIcon} from '../components/icons/AddIcon'
import { useState} from 'react'

const TabelaPage = ({addAgendamento, updateAgendamento, deleteAgendamento, agendamentos, unidades, atendentes}) => {
  const [openModal, setModal] = useState(false);
  const [updateForm, setUpdateForm] = useState(null);
  //Prencher formulário ao editar
  const formFill = (agendamento) => {
    setModal(true)
    setUpdateForm(agendamento)
  }
  const closeModal = () => {
    setUpdateForm(null);
    setModal(false);
  }

  return (
    <div className='mt-16'> 
      <div className='flex justify-between mx-auto mb-5 w-[950px]'>
        <h2 className='text-3xl font-bold dark:text-gray-300 text-gray-800'>Tabela de Agendamentos</h2>
        <button className='block p-2 bg-blue-500 border-none rounded-lg text-white dark:text-gray-100 hover:bg-blue-600 active:bg-blue-700 focus:outline-2 focus:outline focus:outline-blue-300 active:outline-none' onClick={()=> {setModal(true);setUpdateForm(null)}}><AddIcon/></button>
      </div>
      {openModal && <Modal setModal={setModal}><AgendamentoForm agendamentoSubmit={addAgendamento} onAgendamentoUpdate={updateAgendamento} updateForm={updateForm} unidades={unidades} atendentes={atendentes} closeModal={closeModal}/></Modal>}
      <TabelaAgendamento onEdit={formFill} deleteAgendamento={deleteAgendamento} agendamentos={agendamentos}/>
    </div>
  )
}
export default TabelaPage