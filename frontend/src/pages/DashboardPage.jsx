import DashboardCard from '../components/DashboardCard'
import ChartContainer from '../components/ChartContainer';
import DoughnutChart from "../components/charts/DoughnutChart"
import PieChart from '../components/charts/PieChart'
import LineChart from "../components/charts/LineChart"
const DashboardPage = ({agendamentos , unidades, atendentes,darkMode}) =>{

  //Média de agendamento por dia. Baseado no range de agendamentos
  const mediaAgendamentos = (agendamentos)=> {
    let agendamentosDataMil = agendamentos.map(agendamento => new Date(agendamento.data).getTime())
    let dataFim = Math.max(... agendamentosDataMil)
    let dataInicio = Math.min(... agendamentosDataMil)
    let diferencaDias = Math.round(dataFim - dataInicio) / (1000 * 3600 * 24)
    return `${(agendamentos.length / diferencaDias).toFixed(1)}`
  }

  return (
    <div className="mt-12 ms-12">
      <div className="flex w-100 gap-6">
        <DashboardCard titulo={"Total de agendamentos"}>
          {agendamentos.length > 0 && agendamentos.length}
        </DashboardCard>
        <DashboardCard titulo={"Média de agendamentos"}>
          {agendamentos.length > 0 && mediaAgendamentos(agendamentos)}
          <span className='text-gray-700 dark:text-gray-300 xl:text-xl text-lg inline-block align-middle'>/dia</span>
        </DashboardCard>
      </div>
      <div className="flex w-100 gap-12 mt-8 flex-wrap">    
        <ChartContainer titulo={"Agendamentos por mês"}>
          <LineChart agendamentosDATA={agendamentos} darkMode={darkMode}/>
        </ChartContainer>
        <ChartContainer titulo={"Agendamentos por unidade"}>
          <DoughnutChart agendamentosDATA={agendamentos} unidadesDATA={unidades} darkMode={darkMode}/>
        </ChartContainer>
        <ChartContainer titulo={"Agendamentos por atendente"}>
          <PieChart agendamentosDATA={agendamentos} atendentesDATA={atendentes} darkMode={darkMode}/>
        </ChartContainer>
      </div>
    </div>
  )
}

export default DashboardPage