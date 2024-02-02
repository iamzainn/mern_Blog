import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"


const AdminOnlyComponent = () => {
    const {user} = useSelector((state:RootState)=>state.User);
  return (
    <>
    {user?.isAdmin ?(<Outlet></Outlet>):<Navigate to={"/Sign-in"}/>}
    </>
     
  )
}

export default AdminOnlyComponent
