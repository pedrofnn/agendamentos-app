import {CloseIcon} from './icons/CloseIcon'
const Modal = ({children, setModal})=> {

  const styleClass = {
    modalBackground: "inset-0 fixed top-0 left-0 z-40 bg-black/25 grid place-items-center",
    modalCard: "bg-white w-fit m-0 p-8 rounded rounded-lg shadow-xl z-50 popup-animation relative dark:bg-gray-800 dark:text-gray-200",
    modalHeader: "mb-5 font-bold text-lg",
    closeButton: "text-red-500 p-2 rounded hover:text-red-600 block absolute top-0 right-0 -translate-x-0.5 translate-y-0.5",
  }
  
  return (
    <div className={styleClass.modalBackground} onClick={()=> setModal(false)}>
      <div className={styleClass.modalCard} onClick={(e)=> e.stopPropagation()}>
        <div className={styleClass.modalHeader}>
          <button className={styleClass.closeButton} onClick={()=> setModal(false)}><CloseIcon/></button>
          <h2>Novo Agendamento</h2> 
        </div>
        {children}
      </div>
    </div>
  )
}
export default Modal