import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidbar from "../Components/DashboardSidbar";
import DashProfile from "../Components/DashProfile";
import DisplayPost from "../Components/DisplayPost";

const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab] = useState <string | null>("");
  useEffect(()=>{
  const urlParam = new URLSearchParams(location.search);
     setTab (urlParam.get("tab"))
  },[location.search])
 

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
     <div className="">
      <DashboardSidbar queryParam={tab}></DashboardSidbar>
      </div>
      {tab === 'Profile' && <DashProfile></DashProfile>}  
      {tab === 'Posts' && <DisplayPost></DisplayPost>} 
    </div>
  )
}

export default Dashboard
