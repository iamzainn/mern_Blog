import {  useSelector } from "react-redux";
import type { RootState } from "../app/store";

type ThemeProviderType = {
    children :React.ReactNode
}

const ThemeProvider = ({children}:ThemeProviderType) => {
    const {theme} = useSelector((state:RootState)=>state.theme)
  return (
    <>
    
        <div className={`${theme}`}>
        <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(32,34,35)] min-h-screen">
        {children}
        </div>
        </div>
    
    </>
    
  )
}

export default ThemeProvider
