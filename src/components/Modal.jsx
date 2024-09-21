import {CloseIcon} from './icons/CloseIcon'
const Modal = ({children, setModal})=> {
  return (
    <>
      <div className="inset-0 fixed top-0 left-0 z-40 bg-white/75" onClick={()=> setModal(false)}></div>
      <div className="bg-white  w-fit p-7 rounded rounded-md shadow-xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mb-5 font-bold text-lg flex justify-between">
          <h2>Novo Agendamento</h2>
          <button className=" text-red-500 p-2 rounded hover:text-red-600" onClick={()=> setModal(false)}><CloseIcon/></button>
        </div>
        {children}
      </div>
    </>
  )
}
export default Modal