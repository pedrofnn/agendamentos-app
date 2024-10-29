import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement,Legend, Tooltip, Filler} from 'chart.js'
import { useState, useEffect } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Filler);


const LineChart = ({agendamentosDATA, darkMode}) => {
  //Ordenar agendamento pela data de forma crescente
  const ordenarAgendamentos = (agendamentos) => {
    const copiaAgendamentos = JSON.parse(JSON.stringify(agendamentos))
    return copiaAgendamentos.sort((a,b) => new Date(a.data) - new Date(b.data))
  }
  //Pegar os meses únicos em agendamentos
  const getMonths = (agendamentos) =>{
    const mesesDosAgendamentos = ordenarAgendamentos(agendamentos).map((agendamento) => {
      const mesDoAgendamento = new Date (agendamento.data).toLocaleString('default', {month: 'long', timeZone: 'UTC'})
      return mesDoAgendamento
  })
    const mesesUnicos  = [... new Set(mesesDosAgendamentos)]
    return mesesUnicos
  }
  //Agrupar agendamentos pelo mes/ano
  const getAgendamentosPorMes = (agendamentos) => {
    //Inicializar array bidimensional de acordo com os meses únicos
    const agendamentosPorMes = [];
    let meses = getMonths(agendamentos);
    for(let i = 0; i < meses.length; i++){
      agendamentosPorMes.push([]);
    };

    //Ordenar Agendamentos
    const agendamentosOrdemCres = ordenarAgendamentos(agendamentos)
    let k = 0

    // Adicionar agendamentos no array do mês
    agendamentosOrdemCres.forEach((agendamento, index, agendamentos) => {
      const agendamentoMesAno = new Date(agendamento.data).toLocaleString('default', {month: 'long', year: '2-digit', timeZone: 'UTC'});
      agendamentosPorMes[k].push(agendamento);
      if(agendamentos[index + 1]){
        let agendamentoMesAno2 = new Date(agendamentos[index + 1].data).toLocaleString('default', {month: 'long', year: '2-digit', timeZone: 'UTC'});
        if(agendamentoMesAno !== agendamentoMesAno2){
          k++
        }
      }
      return
    })
    return agendamentosPorMes
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: ["Agendamentos"],
      data: [],
      backgroundColor: '#2563eb30',
      borderColor: '#2563eb',
      tension: 0.4,
      fill: true,
      radius: 4,
    }]
  })

  // Atualizar gráfico quando os dados mudarem
  useEffect(() => {
    const meses = getMonths(agendamentosDATA)
    const agendamentosPorMes = getAgendamentosPorMes(agendamentosDATA)
    setChartData({
      labels: meses.map(mes => mes.replace(/^./, mes[0].toUpperCase())),
      datasets: [{
        label: ["Agendamentos"],
        data: agendamentosPorMes.map(agendamentoPorMes => agendamentoPorMes.length),
        backgroundColor: '#2563eb30',
        borderColor: '#2563eb',
        tension: 0.4,
        fill: true,
        radius: 4,
    }]
    })
  }, [agendamentosDATA])

  //Opções do gráfico
  const chartOptions = {
    plugins:{
      legend: {
        display: false
      },
      datalabels: {
        display: false,
      }
    },
    scales: {
      x: {
        grid:{
          display: false,
          color: darkMode ? "#d1d5db60" : '#e5e7eb',
        },
        ticks:{
          color: darkMode ? "#d1d5db" : '#1f2937',
        }
      },
      y:{
        beginAtZero: true,
        min: 0,
        grid:{
          drawOnChartArea: true,
          color: darkMode ? "#d1d5db60" : '#e5e7eb',
          borderColor: 'red'
        },
        border:{
          color: darkMode ? "#d1d5db60" : '#e5e7eb',
        },
        max: Math.max(...chartData.datasets[0].data) + 10,
        ticks: {
          stepSize: 1,
          color: darkMode ? "#d1d5db" : '#1f2937',
        },     
      },
      
    }
};


  return (
    <Line data={chartData} options={chartOptions} />
  )
}

export default LineChart