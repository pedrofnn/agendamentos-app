import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const MainLayout = ({darkMode, setDarkMode}) => {
  return (
    <div className='min-h-screen dark:bg-gray-900 flex flex-row min-w-screen'>
    <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
    <div className='p-4 sm:ml-22 ms-0  grow bg-gray-100 dark:bg-gray-900'>
      <Outlet/>
    </div>
  </div>
  )
}
export default MainLayout