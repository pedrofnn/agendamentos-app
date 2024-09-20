import { useState } from 'react'
import AgendamentoForm from './components/AgendamentoForm'
import TabelaAgendamento from './components/TabelaAgendamento'
import NavBar from './components/NavBar'

const App = ()=> {
    return (
    <>
      <NavBar />
      <div className='p-4 sm:ml-28'>
        <AgendamentoForm />
        <div className='flex justify-between mx-auto table-div mb-5'>
          <h2 className='text-3xl font-bold'>Tabela de Agendamentos</h2>
          <button className='block py-2 px-4 bg-blue-500 border rounded text-white text-xl'>+</button>
        </div>
        <TabelaAgendamento />
      </div>
    </>  
  )
}

export default App
