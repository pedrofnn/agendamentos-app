import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

// Registre os elementos necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ agendamentosDATA, unidadesDATA, darkMode}) => {
  
  //Filtrar agendamento por unidade
  const agendamentosPorUnidade = (unidades, agendamentos) => {
    return unidades.map(unidade => {
      const totalPorUnidade = agendamentos.filter(agendamento => agendamento.unidade._id === unidade._id);
      return totalPorUnidade.length;
    });
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Total de Agendamentos",
      data: [],
      backgroundColor: [
        'rgba(255, 26, 104, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(0, 0, 0, 0.8)'
      ]
    }]
  });

  // Atualizar gráfico quando os dados mudarem
  useEffect(() => {
    if (agendamentosDATA.length > 0 && unidadesDATA.length > 0) {
      const data = agendamentosPorUnidade(unidadesDATA, agendamentosDATA);
      const unidades = unidadesDATA.filter((unidade) => {
        if(unidade.ativa){
          return unidade;
        }
      });
      setChartData({
        labels: unidades.map(unidade => unidade.nome),
        datasets: [{
          label: "Total de Agendamentos",
          data: data,
          borderColor: darkMode ? "#1f2937" : "#FFFFFF",
          backgroundColor: [
            'rgba(255, 26, 104, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(0, 0, 0, 0.8)'
          ]
        }]
      });
    }
  }, [agendamentosDATA, unidadesDATA, darkMode]);


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
        align: 'center  ',
        formatter: ((value, ctx) => {
          const totalSum = ctx.dataset.data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);
          const percentage = value / totalSum * 100
          return `${percentage.toFixed(1)}%`
        }),
        color: "white",
      }
    }
  }

  return (
    <Doughnut data={chartData} options={chartOptions}/>
  );
};

export default DoughnutChart;