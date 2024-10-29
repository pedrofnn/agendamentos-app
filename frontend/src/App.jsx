import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MainLayout from './layout/MainLayout'
import TabelaPage from './pages/TabelaPage'
import DashboardPage from './pages/DashboardPage'

const App = ()=> {
  const [darkMode, setDarkMode] = useState(false)
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
  }


  //Inicializar fetch
  useEffect(() => {
    const fetchData = async() =>{
    await  Promise.all([fetchAgendamentos(), fetchUnidades(), fetchAtendentes()]);
    }
    fetchData()
  }, []);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
        <Route path='/' element={<DashboardPage agendamentos={agendamentos} unidades={unidades} atendentes={atendentes}darkMode={darkMode}/>} />
        <Route path='/agendamentos' element={<TabelaPage agendamentos={agendamentos} unidades={unidades} atendentes={atendentes} addAgendamento={addAgendamento} updateAgendamento={updateAgendamento} deleteAgendamento={deleteAgendamento}/>} />
      </Route>
    )
  )

    return (
    <RouterProvider router={router} />
  )
}

export default App
