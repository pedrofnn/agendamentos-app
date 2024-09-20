import agendamentos from "../AgendamentosDB"
const TabelaAgendamento = () => {
  const Cells = ({ children, headerCell = false}) => {
    return (<th className={`px-6 ${headerCell === true ?"py-3 font-bold": "py-4 font-light"}`}>{children}</th>)
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg table-div mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <Cells headerCell={true}>Horário</Cells>
            <Cells headerCell={true}>Data</Cells>
            <Cells headerCell={true}>Nome</Cells>
            <Cells headerCell={true}>Unidade</Cells>
            <Cells headerCell={true}>Atendente</Cells>
          </tr>
        </thead>
        <tbody>
        {agendamentos.map((agendamento, index) => (
          <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            <Cells>{agendamento.horario}</Cells>
            <Cells>{agendamento.data}</Cells>
            <Cells>{agendamento.nome}</Cells>
            <Cells>{agendamento.unidade}</Cells>
            <Cells>{agendamento.atendente}</Cells>
          </tr>
        ))}
        </tbody>     
      </table>
    </div>
    
  )
}
export default TabelaAgendamento