const unidades = ["Coritinha", "Rotary", "Aclimação"]
const atendentes = ["Débora", "Letícia"]

const AgendamentoForm = () => {
  const Label = ({children, width = "w-full"}) => {
    return (
      <label className={`flex flex-col gap-1 mb-3 ${width} dark:text-white`}>{children}</label>
    )
  }
  const Input = ({type, inputName}) => {
    return (
      <input type={type} name={inputName} className={`p-1 border rounded border-grey-300 border-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none dark:[color-scheme:dark]`}/>
    )
  }
  const Select = ({data}) => {
    return (
      <select className="p-2 border rounded bg-gray-50 border-gray-200 text-sm border-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" defaultValue={0}>
        <option disabled className="hidden" value={0}></option>
        {data.map((nome, index) => <option value={nome} key={index}>{nome}</option>)}
      </select>
    )
  }
  return (
    <form className="w-96 mx-auto">
      <Label>Nome
        <Input type={"text"} inputName={"nome"}/>
      </Label>
      <div className="flex justify-between">
        <Label width={"w-2/5"}>Data
          <Input type={"date"} inputName={"data"}/>
        </Label>
        <Label width={"w-1/4 relative"}>Horário
          <Input type={"time"} inputName={"horario"}/>
          <span className="absolute top-1/2 right-2 z-10"></span>
        </Label>
      </div>
      <Label>Unidade
        <Select data={unidades}/>
      </Label>
      <Label>Atendente
        <Select data={atendentes}/>
      </Label>
      <button type="submit" className="block rounded bg-blue-600 py-2 px-4 mx-auto mt-6 text-white hover:bg-blue-700 active:bg-blue-800">Enviar</button>
    </form>
  )
}
export default AgendamentoForm