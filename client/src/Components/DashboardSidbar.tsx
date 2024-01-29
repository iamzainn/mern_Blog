

import { Sidebar } from 'flowbite-react';

import {  HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function DashboardSidbar({queryParam}:{queryParam:string}) {
   

  return (
    <Sidebar aria-label="Sidebar with content separator example" className='min-w-full'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to = "/dashboard?tab=Profile">
          <Sidebar.Item icon = {HiUser} label = {"User"} active = {queryParam ==='Profile'} as = {"div"} >
           Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item >
            Sign Out 
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default DashboardSidbar;

