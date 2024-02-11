

import {  Sidebar } from 'flowbite-react';

import {  HiAnnotation, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { SignoutAcc } from './DashProfile';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../app/store';

function DashboardSidbar({queryParam}:{queryParam:string | null}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.User);

  return (
    <Sidebar aria-label="Sidebar with content separator example" className='min-w-full'>
      <Sidebar.Items >
        <Sidebar.ItemGroup className='flex flex-col gap-3'>
        {user?.isAdmin &&<Link to = "/dashboard?tab=Dash">
          <Sidebar.Item   active={queryParam === 'Dash' || !queryParam}
                icon={HiChartPie} as = {"div"} >
          Dash
          </Sidebar.Item>
          </Link>}
          <Link to = "/dashboard?tab=Profile">
          <Sidebar.Item icon = {HiUser} label = {`${user?.isAdmin ? ("Admin"):("User")}`} active = {queryParam ==='Profile'} as = {"div"} >
           Profile
          </Sidebar.Item>
          </Link>
          {user?.isAdmin &&(<><Link to = "/dashboard?tab=Posts">
          <Sidebar.Item icon = {HiDocumentText } active = {queryParam ==='Posts'} as = {"div"}>
           Posts
          </Sidebar.Item>
          </Link>
          
          <Link to = "/dashboard?tab=Users">
          <Sidebar.Item icon = {HiOutlineUserGroup} active = {queryParam ==='Users'} as = {"div"} >
           Users
          </Sidebar.Item>
          </Link>
          <Link to = "/dashboard?tab=Comments">
          <Sidebar.Item icon = {HiAnnotation} active = {queryParam ==='Comments'} as = {"div"} >
           Comments
          </Sidebar.Item>
          </Link>
          </>)}
          <Link to="" onClick={()=>SignoutAcc(user?._id as string,dispatch)}>
          <Sidebar.Item as = {"div"} >
            Sign Out
          </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default DashboardSidbar;

