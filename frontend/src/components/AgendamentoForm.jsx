import { useState } from 'react';

const AgendamentoForm = ({updateForm, agendamentoSubmit, unidades, atendentes, onAgendamentoUpdate}) => {
  const [agendamentoId, setAgendamentoId] = useState(updateForm ? updateForm._id : "")
  const [pacienteNome, setPacienteNome] = useState(updateForm ? updateForm.pacienteNome : "");
  const [data, setData] = useState(updateForm ? formDate(updateForm.data) : "");
  const [horario, setHorario] = useState(updateForm ? updateForm.horario : "");
  const [unidade, setUnidade] = useState(updateForm ? updateForm.unidade._id : "");
  const [atendente, setAtendente] = useState(updateForm ? updateForm.atendente._id : "");

  const submitForm = (e) => {
    e.preventDefault();
    const novoAgendamento = {
      pacienteNome,
      data,
      horario,
      unidade,
      atendente
    }
    if(!updateForm){
      agendamentoSubmit(novoAgendamento);
    } else {
      onAgendamentoUpdate(novoAgendamento, agendamentoId);
    }
  }
  function formDate(dateString){
    const date = dateString.split("T");
    return date[0];
  }

  const classes = {
    label: `flex flex-col gap-1 mb-3 dark:text-white`,
    input: "p-1 border rounded border-grey-300 border-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none dark:[color-scheme:dark]",
    select: "p-2 border rounded bg-gray-50 border-gray-200 text-sm border-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none",
    button: "block rounded bg-blue-600 py-2 px-4 mx-auto mt-6 text-white hover:bg-blue-700 active:bg-blue-800",
  }

  return (
    <form className="w-96 mx-auto" onSubmit={submitForm}>
      <label className={`${classes.label} w-full`}>Nome Paciente
        <input type="text" name="pacienteNome" className={classes.input} value={pacienteNome} onChange={(e) => setPacienteNome(e.target.value)} required/>
      </label>
      <div className="flex justify-between">
        <label className={`${classes.label} w-2/5`} >Data
          <input type="date" name="data" className={classes.input} value={data} onChange={(e) => setData(e.target.value)} required/>
        </label>
        <label className={`${classes.label} w-1/4 relative`} >Horário
          <input type="time" name="horario" className={classes.input} value={horario} onChange={(e) => setHorario(e.target.value)} required/>
          <span className="absolute top-1/2 right-2 z-10"></span>
        </label>
      </div>
      <label className={`${classes.label} w-full`}>Unidade
        <select className={classes.select} value={unidade} onChange={(e) => setUnidade(e.target.value)} required>
          <option disabled className="hidden" value={""}></option>
          {unidades.map((unidade) => <option key={unidade._id} value={unidade._id}>{unidade.nome}</option>)}
      </select>
      </label>
      <label className={`${classes.label} w-full`}>Atendente
        <select className={classes.select} value={atendente} onChange={(e) => setAtendente(e.target.value)} required>
          <option disabled className="hidden" value={""}></option>
          {atendentes.map((atendente) => <option key={atendente._id} value={atendente._id}>{atendente.nome}</option>)}
        </select>
      </label>
      <button type="submit" className={classes.button}>Enviar</button>
    </form>
  )
}
export default AgendamentoForm