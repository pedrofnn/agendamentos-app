import {EditIcon} from "./icons/EditIcon"
import {DeleteIcon} from "./icons/DeleteIcon"
const TabelaAgendamento = ({deleteAgendamento, editAgendamento, agendamentos}) => {
  
    const styleClass = {
      table: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
      thead: "text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400",
      tr: "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700",
      th: "px-6 py-3 font-bold text-center",
      td: "px-6 py-4 font-light text-center",
      button: "outline-none focus:outline-none",
      editIcon: "text-blue-500 hover:text-blue-600 active:text-blue-700",
      deleteIcon: "text-red-500 hover:text-red-600 active:text-red-700",
    }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg table-div mx-auto">
      <table className={styleClass.table}>
        <thead className={styleClass.thead}>
          <tr>
            <th className={styleClass.th}>Horário</th>
            <th className={styleClass.th}>Data</th>
            <th className={styleClass.th}>Nome</th>
            <th className={styleClass.th}>Unidade</th>
            <th className={styleClass.th}>Atendente</th>
            <th className={styleClass.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
        {agendamentos.map((agendamento, index) => (
          <tr key={index} className={styleClass.tr}>
            <td className={styleClass.td}>{agendamento.horario}</td>
            <td className={styleClass.td}>{agendamento.data}</td>
            <td className={styleClass.td}>{agendamento.nome}</td>
            <td className={styleClass.td}>{agendamento.unidade}</td>
            <td className={styleClass.td}>{agendamento.atendente}</td>
            <td className={`${styleClass.td} flex gap-3 justify-center`}>
              <button className={styleClass.button} onClick={()=> editAgendamento(agendamento)}><EditIcon fill={"currentColor"} className={styleClass.editIcon}/></button>
              <button className={styleClass.button} onClick={()=> deleteAgendamento(agendamento)}><DeleteIcon fill={"currentColor"} className={styleClass.deleteIcon}/></button>
            </td>
          </tr>
        ))}
        </tbody>     
      </table>
    </div>
    
  )
}
export default TabelaAgendamento