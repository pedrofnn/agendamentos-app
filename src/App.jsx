import { useState } from 'react'
import AgendamentoForm from './components/AgendamentoForm'
import TabelaAgendamento from './components/TabelaAgendamento'

const App = ()=> {

    return (
    <>
      <AgendamentoForm />
      <h2 className='text-3xl font-bold underline'>Tabela de Agendamentos</h2>
      <TabelaAgendamento />
    </>
  )
}

export default App
