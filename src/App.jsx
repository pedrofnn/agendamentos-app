import { useState } from 'react'
import AgendamentoForm from './components/AgendamentoForm'
import TabelaAgendamento from './components/TabelaAgendamento'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
import {AddIcon} from './components/icons/AddIcon'

const App = ()=> {
  const [openModal, setModal] = useState(false)
    return (
    <>
      <NavBar />
      <div className='p-4 sm:ml-28'>
        
        <div className='flex justify-between mx-auto table-div mb-5'>
          <h2 className='text-3xl font-bold'>Tabela de Agendamentos</h2>
          <button className='block p-2 bg-blue-500 border-none rounded-lg text-white hover:bg-blue-600 active:bg-blue-700' onClick={()=> {setModal(true)}}><AddIcon/></button>
        </div>
        {openModal && <Modal setModal={setModal}><AgendamentoForm /></Modal>}
        <TabelaAgendamento />
      </div>
    </>  
  )
}

export default App
