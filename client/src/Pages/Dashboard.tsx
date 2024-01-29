import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashboardSidbar from "../Components/DashboardSidbar";
import DashProfile from "../Components/DashProfile";

const Dashboard = () => {
 
 
  const location = useLocation();
 
  const [tab,setTab] = useState("");
   useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
   },[tab])



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
     <div className="">
      <DashboardSidbar queryParam={tab}></DashboardSidbar>
      </div>
      {tab === 'Profile' && <DashProfile></DashProfile>} 
    </div>
  )
}

export default Dashboard
