const ChartContainer = ({children, titulo}) => {
  return (
    <div className='rounded-xl shadow-md p-3 w-[380px] h-[304px] 2xl:w-[500px] 2xl:h-[400px] flex justify-center flex-col items-center dark:bg-gray-800 bg-white gap-3'>
      <h2 className='text-xl font-bold dark:text-gray-300 text-gray-800'>{titulo}</h2>
      <div className='w-full h-4/5 flex justify-center items-center'>
        {children}
      </div>
    </div>
  )
}
export default ChartContainer
