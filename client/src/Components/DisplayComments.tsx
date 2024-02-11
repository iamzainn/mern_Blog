import { Button, Table} from "flowbite-react";
import { useQuery } from "react-query";
import {  useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Spinner } from 'flowbite-react';
import { useState } from "react";
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getCommentsPerPost } from "../Types/types";
import { getComments } from "../Functions/apis";



const DisplayComments = () => {
const {user} = useSelector((state:RootState)=>state.User);
const [comments,setComments] = useState<getCommentsPerPost[]>([] as getCommentsPerPost[])
const [showMore,setShowMore] = useState(true);
const [showMoreLoad,setShowMoreLoad] = useState(false);
const [model,setModel] = useState({model:false,cId:""});




  const {data,isLoading}=useQuery({
    queryKey:['AllComments'],
    queryFn:()=>getComments(undefined),
    onSuccess:(data)=>{
      setComments(data.comments);
      if(data.comments.length <9){
        setShowMore(false);
        return
      }
      setShowMore(true);

    },
    refetchOnWindowFocus:false
  })
  const fetchMoreComments = async()=>{
    setShowMoreLoad(true)
   try{
      const data = await getComments(comments.length);
      
      if(data.comments.length<9){
        setShowMore(false);
      }
      setComments((previous)=>{return [...previous,...data.comments]})
      setShowMoreLoad(false);

   }catch(e){
      console.log(e);
   }
  }
  

  const delComment = async (commentId:string, userId:string,) => {
    setModel({model:false,cId:""})
    try {
     
      const res = await fetch(`/api/comment/del/${userId}/${commentId}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json" }
        
      });
  
      if (res.ok) {
        const {comment} = await res.json();
       
        setComments((pre)=>pre.filter(c=>c._id!==comment._id));
      }
    } catch (e) {
      console.log(e);
    }
  }


   if(isLoading){
    return <div className="text-center w-screen min-h-screen flex items-center justify-center">
    <Spinner size={'xl'} aria-label="Center-aligned spinner example" />
  </div>
   }
  return (
    <>
    {data?.comments && user?.isAdmin ?( <div className="overflow-x-auto m-4 table-auto md:mx-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Comment Content</Table.HeadCell>
          <Table.HeadCell>Post id</Table.HeadCell>
          <Table.HeadCell>user Id</Table.HeadCell>
          <Table.HeadCell>Number of Likes</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {comments.map((comment)=>{
            return <Table.Row key={comment.updatedAt} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {new Date(comment.updatedAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell><span  className="max-w-24 max-h-24 object-cover">{comment.content}</span></Table.Cell>
            <Table.Cell><span>{comment.postId}</span></Table.Cell>
            <Table.Cell>{comment.userId}</Table.Cell>
            <Table.Cell>{comment.numberOfLikes}</Table.Cell>
            <Table.Cell ><button className="font-medium text-red-500 cursor-pointer" onClick={()=>setModel({model:true,cId:comment._id})}>Delete</button></Table.Cell>
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
              <Button  color="failure" onClick={()=>delComment(model.cId,user._id)} type="button"  >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray"type="button" onClick={() =>setModel({...model,model:false})}>
                No, cancel
              </Button>
            </div>
          </div>
          </Modal.Body>
        </Modal>
      {(showMore && comments.length>0) && <div className="flex min-w-full justify-center my-2"> {showMoreLoad ? ( <Spinner size={'md'} aria-label="Center-aligned spinner example" />):(<Button type="button" className="text-centre text-white" onClick={fetchMoreComments} color="success">Show More</Button>)}</div>}
    </div>  ):(<p>You have Zero  Comments</p>)}
    </>
  );

  

 

};

export default DisplayComments;
