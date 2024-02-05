import { Button, Table} from "flowbite-react";
import { useQuery } from "react-query";
import {  useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import { Spinner } from 'flowbite-react';
import { useState } from "react";
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export type postType = {
  _id: string;
  title: string;
  Category:string
  Content: string;
  img: string;
  userId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _v: 0;
}
export type getPostsType = {
  posts :postType[];
  totalPosts: number;
  lastMonthPosts: number;
};

const DisplayPost = () => {
 
const {user} = useSelector((state:RootState)=>state.User);
const [userPosts,setUserPosts] = useState<postType[]>([] as postType[])
const [showMore,setShowMore] = useState(true);
const [showMoreLoad,setShowMoreLoad] = useState(false);
const [model,setModel] = useState({model:false,id:""});

const getPosts = async (startIndex:number|undefined) => {
  
  try {
    const response = await fetch(`api/post/getPosts?userId=${user?._id}&startIndex=${startIndex}`, {
      method: "GET",
    });

    if (response.ok) {
      const data: getPostsType = await response.json();
      
      return data;
    }

    throw new Error("Failed to fetch data");
  } catch (error) {
    throw error;
  }
};


  const {data,isLoading,refetch}=useQuery<getPostsType>({
    queryKey:['AllPosts'],
    queryFn:()=>getPosts(undefined),
    onSuccess:(data)=>{
      setUserPosts(data.posts);
      if(data.posts.length <9){
        setShowMore(false);
        return
      }
      setShowMore(true);

    }
  })
  const fetchMorePosts = async()=>{
    setShowMoreLoad(true)
   try{
      const data = await getPosts(userPosts.length+1);
      
      if(data.posts.length<9){
        setShowMore(false);
      }
      setUserPosts((previous)=>{return [...previous,...data.posts]})
      setShowMoreLoad(false);

   }catch(e){
      console.log(e);
   }
  }
  const deletePost  = async()=>{
    const res = await fetch(`api/post/delete/${user?._id}/${model.id}`,{
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
    {data?.totalPosts && user?.isAdmin ?( <div className="overflow-x-auto m-4 table-auto md:mx-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {userPosts.map((post)=>{
            return <Table.Row key={post.updatedAt} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {new Date(post.updatedAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell><img className="max-w-24 max-h-24 object-cover" src={`${post.img}`}></img></Table.Cell>
            <Table.Cell><Link to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
            <Table.Cell>{post.Category}</Table.Cell>
            <Table.Cell ><button className="font-medium text-red-500 cursor-pointer" onClick={()=>setModel({model:true,id:post._id})}>Delete</button></Table.Cell>
            <Table.Cell><Link className="cursor-pointer text-teal-500" to ={`/update-post/${post._id}`}><span>Edit</span></Link></Table.Cell>
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
              <Button  color="failure" type="button"  onClick={deletePost} >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray"type="button" onClick={() =>setModel({...model,model:false})}>
                No, cancel
              </Button>
            </div>
          </div>
          </Modal.Body>
        </Modal>
      {(showMore && userPosts.length>0) && <div className="flex min-w-full justify-center my-2"> {showMoreLoad ? ( <Spinner size={'md'} aria-label="Center-aligned spinner example" />):(<Button type="button" className="text-centre text-white" onClick={fetchMorePosts} color="success">Show More</Button>)}</div>}
    </div>  ):(<p>You have zero Posts</p>)}
    </>
  );

  

 

};

export default DisplayPost
