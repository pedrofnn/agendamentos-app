import agendamentos from "../AgendamentosDB"
import {EditIcon} from "./icons/EditIcon"
import {DeleteIcon} from "./icons/DeleteIcon"
const TabelaAgendamento = () => {
  const Cells = ({ children, headerCell = false, customClass}) => {
    return (<th className={`px-6 ${headerCell === true ?"py-3 font-bold": "py-4 font-light"} ${customClass} text-center`}>{children}</th>)
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
            <Cells headerCell={true}>Ações</Cells>
          </tr>
        </thead>
        <tbody>
        {agendamentos.map((agendamento, index) => (
          <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Cells>{agendamento.horario}</Cells>
            <Cells>{agendamento.data}</Cells>
            <Cells>{agendamento.nome}</Cells>
            <Cells>{agendamento.unidade}</Cells>
            <Cells>{agendamento.atendente}</Cells>
            <Cells customClass={"flex gap-3 justify-center"}>
              <button className="outline-none focus:outline-none"><EditIcon fill={"currentColor"} className="text-blue-500 hover:text-blue-600 active:text-blue-700"/></button>
              <button className="outline-none focus:outline-none"><DeleteIcon fill={"currentColor"} className="text-red-500 hover:text-red-600 active:text-red-700"/></button>
            </Cells>
          </tr>
        ))}
        </tbody>     
      </table>
    </div>
    
  )
}
export default TabelaAgendamento