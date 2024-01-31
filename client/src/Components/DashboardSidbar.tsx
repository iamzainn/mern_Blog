

import { Button, Sidebar } from 'flowbite-react';

import {  HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { SignoutAcc } from './DashProfile';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../app/store';

function DashboardSidbar({queryParam}:{queryParam:string}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.User);

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
            <Button onClick={()=>SignoutAcc(user?._id as string,dispatch)}>Sign Out</Button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default DashboardSidbar;

