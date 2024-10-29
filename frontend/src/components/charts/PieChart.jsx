import {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend , ChartDataLabels);

const PieChart = ({agendamentosDATA, atendentesDATA, darkMode}) => {

  //Filtrar agendamentos por atendente
  const agendamentosPorAtendente = (agendamentos, atendentes) => {
    const atendentesFiltered = atendentes.map((atendente) => {
      const numeroDeAgendamentos = agendamentos.filter((agendamento) => agendamento.atendente._id === atendente._id);
      return numeroDeAgendamentos.length
    })
    return atendentesFiltered
  }
  
  const [useChartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Agendamentos",
      data: [],
      borderWidth: 0,
      backgroundColor: [
          '#ff9999',
          '#99ffdd',
          '#ffff99',
          '#99ccff',
          '#ffb380',
          '#80ff80',
          '#9999ff',
          '#ffd966'
      ]
    }]
  });

  // Atualizar gráfico quando os dados mudarem
  useEffect(() => {
    if(agendamentosDATA.length > 0 && atendentesDATA.length > 0){ 
      const atendentes = atendentesDATA.filter((atendente) => {
        if(atendente.ativa){
          return atendente;
        }
      });
      const data = agendamentosPorAtendente(agendamentosDATA, atendentes);
      setChartData({
        labels: atendentes.map(atendente => atendente.nome),
        datasets: [{
          label: "Agendamentos",
          data: data,
          borderColor: 'transparent',
          borderWidth: 0,
          backgroundColor: [
          '#ff9999',
          '#99ffdd',
          '#ffff99',
          '#99ccff',
          '#ffb380',
          '#80ff80',
          '#9999ff',
          '#ffd966'
          ],
        }],
      });
    }
  },[agendamentosDATA, atendentesDATA, darkMode])
    
  //Opções do gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: darkMode ? "#d1d5db" : '#1f2937',
          boxWidth: 15,
          boxHeight: 15,
          padding: 5,
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        anchor: 'center',
        textShadowColor: 'black',
        textShadowBlur: 6,
        align: 'end',
        formatter: ((value, ctx) => {
          const totalSum = ctx.dataset.data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);
          const percentage = value / totalSum * 100
          return `${percentage.toFixed(1)}%`
        }),
        color: 'white',
      }
    }
  }
  return (
    <Pie data={useChartData} options={chartOptions} className=''/>
  )
}

export default PieChart