import { Button, Table} from "flowbite-react";
import { useQuery } from "react-query";
import {  useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import { Spinner } from 'flowbite-react';
import { useState } from "react";
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export type userType = {
  _id: string;
  username: string;
  email:string,
  isAdmin :boolean,
  profilePicture:string
  createdAt: string;
  updatedAt: string;
  _v: 0;
}
export type getUsersType = {
  users :userType[];
  totalUsers: number;
  lastMonthUsers: number;
};

const DisplayUsers = () => {
 
const {user} = useSelector((state:RootState)=>state.User);
const [users,setUsers] = useState<userType[]>([] as userType[])
const [showMore,setShowMore] = useState(true);
const [showMoreLoad,setShowMoreLoad] = useState(false);
const [model,setModel] = useState({model:false,id:""});

const disAdminItself = (adminId:string)=>{
  if(user?._id ===adminId) return true;
  return false;
}



const getUsers = async (startIndex:number|undefined) => {
  
  try {
    const response = await fetch(`api/user/getUsers/?startIndex=${startIndex}`, {
      method: "GET",
    });

    if (response.ok) {
      const data: getUsersType = await response.json();
      return data;
    }

    throw new Error("Failed to fetch data");
  } catch (error) {
    throw error;
  }
};


  const {data,isLoading,refetch}=useQuery<getUsersType>({
    queryKey:['AllUsers'],
    queryFn:()=>getUsers(undefined),
    onSuccess:(data)=>{
      setUsers(data.users);
      if(data.users.length <9){
        setShowMore(false);
        return
      }
      setShowMore(true);

    }
  })
  const fetchMoreUsers = async()=>{
    setShowMoreLoad(true)
   try{
      const data = await getUsers(users.length+1);
      
      if(data.users.length<9){
        setShowMore(false);
      }
      setUsers((previous)=>{return [...previous,...data.users]})
      setShowMoreLoad(false);

   }catch(e){
      console.log(e);
   }
  }
  const deleteUser  = async()=>{
    const res = await fetch(`api/user/delete/${model.id}`,{
      method:"DELETE"
    });
    if(res.ok){
      await res.json();
      setModel({model:false,id:""});
      refetch();
    }
  }

   if(isLoading){
    return <div className="text-center w-screen min-h-screen flex items-center justify-center">
    <Spinner size={'xl'} aria-label="Center-aligned spinner example" />
  </div>
   }
  return (
    <>
    {data?.users && user?.isAdmin ?( <div className="overflow-x-auto m-4 table-auto md:mx-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>user Image</Table.HeadCell>
          <Table.HeadCell>user name</Table.HeadCell>
          <Table.HeadCell>is Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user)=>{
            return <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell><img className="max-w-12 max-h-12 object-cover rounded-full" src={`${user.profilePicture}`}></img></Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}</Table.Cell>
            <Table.Cell ><button  disabled = {disAdminItself(user._id)} className="font-medium text-red-500 cursor-pointer disabled:opacity-20"  onClick={()=>setModel({model:true,id:user._id})}>Delete</button></Table.Cell>
            <Table.Cell><Link className="cursor-pointer text-teal-500" to ={`/editUser/${user._id}`}><span>Edit</span></Link></Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table>
      <Modal  dismissible show={model.model} size="md" onClose={() => setModel({...model,model:false})} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button  color="failure" type="button"  onClick={deleteUser} >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray"type="button" onClick={() =>setModel({...model,model:false})}>
                No, cancel
              </Button>
            </div>
          </div>
          </Modal.Body>
        </Modal>
      {(showMore && users.length>0) && <div className="flex min-w-full justify-center my-2"> {showMoreLoad ? ( <Spinner size={'md'} aria-label="Center-aligned spinner example" />):(<Button type="button" className="text-centre text-white" onClick={fetchMoreUsers} color="success">Show More</Button>)}</div>}
    </div>  ):(<p>You have zero Users</p>)}
    </>
  );

  

 

};

export default DisplayUsers
