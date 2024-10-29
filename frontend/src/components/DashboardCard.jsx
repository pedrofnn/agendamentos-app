const DashboardCard = ({children, titulo}) => {
  return (
    <div className="2xl:w-[280px] 2xl:h-[100px] w-[210px] h-[75px] bg-white rounded-lg shadow-md flex items-center p-2 flex-col justify-center bg-white dark:bg-gray-800">      
      <h3 className="2xl:text-md text-sm font-bold text-gray-600 dark:text-gray-300">{titulo}</h3>
      <h3 className="2xl:text-3xl text-2xl text-blue-600 font-bold ">{children}</h3>
    </div>
  )
}
export default DashboardCard