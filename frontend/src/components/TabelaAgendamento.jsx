import {EditIcon} from "./icons/EditIcon"
import {DeleteIcon} from "./icons/DeleteIcon"
const TabelaAgendamento = ({deleteAgendamento, onEdit, agendamentos}) => {
  
  //Classes de estilo Tailwind
  const styleClass = {
    container: "mx-auto w-[950px] md:h-[730px] relative overflow-y-auto shadow-md",
    tableDiv: "overflow-x-auto shadow-md sm:rounded-lg md:w-[900px]",
    table: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
    thead: "text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400",
    tr: "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700",
    th: "px-6 py-3 font-bold text-center",
    td: "px-6 py-4 font-light text-center",
    button: "outline-none focus:outline-none",
    editIcon: "text-blue-500 hover:text-blue-600 active:text-blue-700",
    deleteIcon: "text-red-500 hover:text-red-600 active:text-red-700",
  }
  //Formatar a data para tabela
  const dataFormatada = (dataString) => {
    const data = dataString.split('T')
    const dataPartes = data[0].split('-')
    return `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`
  }
  //Deletar agendamento ao clicar no botão de delete
  const onDelete = (agendamentoId) => {
    const confirm = window.confirm(
      "Você tem certeza que deseja excluir este item?"
    )
    if(!confirm){
      return
    }
    deleteAgendamento(agendamentoId);
  }

  return (
    <div className={styleClass.container}>
      <div className={styleClass.tableDiv}>
        <table className={styleClass.table}>
          <thead className={styleClass.thead}>
            <tr>
              <th className={styleClass.th}>Horário</th>
              <th className={styleClass.th}>Data</th>
              <th className={styleClass.th}>Nome Paciente</th>
              <th className={styleClass.th}>Unidade</th>
              <th className={styleClass.th}>Atendente</th>
              <th className={styleClass.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
          {agendamentos.map((agendamento, index) => (
            <tr key={index} className={styleClass.tr}>
              <td className={styleClass.td}>{agendamento.horario}</td>
              <td className={styleClass.td}>{dataFormatada(agendamento.data)}</td>
              <td className={styleClass.td}>{agendamento.pacienteNome}</td>
              <td className={styleClass.td}>{agendamento.unidade.nome}</td>
              <td className={styleClass.td}>{agendamento.atendente.nome}</td>
              <td className={`${styleClass.td} flex gap-3 justify-center`}>
                <button className={styleClass.button} onClick={()=> onEdit(agendamento)}><EditIcon fill={"currentColor"} className={styleClass.editIcon}/></button>
                <button className={styleClass.button} onClick={()=> onDelete(agendamento._id)}><DeleteIcon fill={"currentColor"} className={styleClass.deleteIcon}/></button>
              </td>
            </tr>
          ))}
          </tbody>     
        </table>
      </div>
    </div>    
  )
}
export default TabelaAgendamento