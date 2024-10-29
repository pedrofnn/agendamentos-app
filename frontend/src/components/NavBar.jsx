import {SunIcon} from './icons/SunIcon'
import {MoonIcon} from './icons/MoonIcon'
import {TableIcon} from './icons/TableIcon'
import {DashboardIcon} from './icons/DashboardIcon'
import {NavLink} from 'react-router-dom'

const NavBar = ({darkMode, setDarkMode}) => {
  //Altera tema para escuro
  const toggleTheme = () => {
      document.documentElement.classList.toggle("dark")
      setDarkMode((prevState) => !prevState)
   }  
  //Classes de estilo Tailwind
  const styleClass = {
    aside: "sticky top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0 relative",
    navDiv: "h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col items-center",
    navUl: "space-y-2 font-medium my-auto flex flex-col gap-y-2",
    navLi: "w-fit mx-auto",
    navLink: ({isActive}) => isActive ? "flex items-center p-1 text-white rounded-lg bg-blue-600 dark:text-white group" : "flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group",
    navIcon: {width: "40px", height: "40px"},
    navToolTip: "absolute top-50 left-20 scale-0 group-hover:scale-100 bg-black/75 p-2 text-white rounded-lg font-bold text-sm transition-all",
    themeLabel: "items-center cursor-pointer mt-auto flex flex-col dark:text-gray-400",
    themeInput: "sr-only peer",
    themeIcons: "w-7 h-7 mb-2 text-gray-900 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400 ",
    themeSwitchButton: "relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 order-2 scale-90",  
  }
  return (     
    <>
      <aside className={styleClass.aside} aria-label="Sidebar" id="default-sidebar">
        <div className={styleClass.navDiv}>
          <ul className={styleClass.navUl}>
            <li className={styleClass.navLi}>
              <NavLink to='/' className={styleClass.navLink}>
                <DashboardIcon width={styleClass.navIcon.width} height={styleClass.navIcon.height}/>
                <span className={styleClass.navToolTip}>Dashboard</span>
              </NavLink>
            </li>
            <li className={styleClass.navLi}>
              <NavLink to='/agendamentos' className={styleClass.navLink}>
                <TableIcon width={styleClass.navIcon.width} height={styleClass.navIcon.height}/>
                <span className={styleClass.navToolTip}>Agendamentos</span>
              </NavLink>
            </li>
          </ul>
          <label className={styleClass.themeLabel}>
            <input type="checkbox" value="" className={styleClass.themeInput} defaultChecked id="theme-toggle" onClick={()=> {toggleTheme()}}/>
            {darkMode ? <MoonIcon className={styleClass.themeIcons}/> : <SunIcon className={styleClass.themeIcons}/>}
            <div className={styleClass.themeSwitchButton}></div>  
          </label>
        </div>
      </aside>
    </>
  )  
}
export default NavBar