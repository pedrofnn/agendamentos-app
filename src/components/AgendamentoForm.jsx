const unidades = ["Coritinha", "Rotary", "Aclimação"]
const atendentes = ["Débora", "Letícia"]

const AgendamentoForm = () => {
  return (
    <form>
      <label>Nome:
        <input type="text" name="nome"/>
      </label>
      <label>Data:
        <input type="date" name="data"/>
      </label>
      <label>Horário:
        <input type="time" name="horario"/>
      </label>
      <select>
        <option disabled selected>Selectione</option>
          {unidades.map((nome, index) => <option value={nome} key={index}>{nome}</option>)}
      </select>
      <select>
        <option disabled selected>Selectione</option>
          {atendentes.map((nome, index) => <option value={nome} key={index}>{nome}</option>)}
      </select>
      <input type="submit" value="submit" />
    </form>
  )
}
export default AgendamentoForm