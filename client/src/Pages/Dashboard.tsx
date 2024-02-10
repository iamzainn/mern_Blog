import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidbar from "../Components/DashboardSidbar";
import DashProfile from "../Components/DashProfile";
import DisplayPost from "../Components/DisplayPost";
import DisplayUsers from "../Components/DisplayUsers";
import DisplayComments from "../Components/DisplayComments";
import DashboardComp from "../Components/displayDash";

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
      {tab === 'Users' && <DisplayUsers></DisplayUsers>} 
      {tab === 'Comments' && <DisplayComments></DisplayComments>} 
      {tab === 'Dash' && <DashboardComp></DashboardComp>} 
    </div>
  )
}

export default Dashboard
