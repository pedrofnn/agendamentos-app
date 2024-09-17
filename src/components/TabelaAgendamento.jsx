import agendamentos from "../AgendamentosDB"
const TabelaAgendamento = () => {
  return (
    <table>
        <tr>
          <th>Horário</th>
          <th>Data</th>
          <th>Nome</th>
          <th>Unidade</th>
          <th>Atendente</th>
        </tr>
        {agendamentos.map((agendamento) => (
          <tr>
            <td>{agendamento.horario}</td>
            <td>{agendamento.data}</td>
            <td>{agendamento.nome}</td>
            <td>{agendamento.unidade}</td>
            <td>{agendamento.atendente}</td>
          </tr>
          ))}
      </table>
  )
}
export default TabelaAgendamento