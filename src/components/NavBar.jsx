import {SunIcon} from './icons/SunIcon'
import {MoonIcon} from './icons/MoonIcon'
import {ClockIcon} from './icons/ClockIcon'
import { useState } from 'react'

const NavBar = () => {
   const [darkMode, setDarkMode] = useState(false)
   const toggleTheme = () => {
      document.documentElement.classList.toggle("dark")
      setDarkMode((prevState) => !prevState)
   }  
   const styleClass = {
      aside: "fixed top-0 left-0 z-40 w-24 h-screen transition-transform -translate-x-full sm:translate-x-0",
      navDiv: "h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col items-center",
      navUl: "space-y-2 font-medium",
      navLi: "w-fit mx-auto",
      navLink: "flex items-center p-1 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
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
        <a href="#" className={styleClass.navLink}>
           <ClockIcon className="text-gray-800 dark:text-gray-200"/>
         </a>
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