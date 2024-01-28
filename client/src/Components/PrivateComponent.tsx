import { Navigate,Outlet } from "react-router-dom"
import type { RootState } from "../app/store"
import {  useSelector } from "react-redux"
 



const PrivateComponent = () => {
   const {user} = useSelector((state:RootState)=>state.User)

  return (
    <div>
      {user?._id ?(<Outlet></Outlet>):<Navigate to={"/Sign-in"}/>}
    </div>
  )
}

export default PrivateComponent
