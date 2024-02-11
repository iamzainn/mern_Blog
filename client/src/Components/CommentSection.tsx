import {  useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Link } from "react-router-dom";
import { Textarea, Button, Alert } from "flowbite-react";
import { useMutation } from "react-query";
import {useState} from 'react';
import { useQuery } from "react-query";
import { getCommentsPerPost } from "../Types/types";
import Comment from '../Components/Comment'

const CommentSection = ({postId}:{postId:string}) => {
  
    
    const {user} = useSelector((state:RootState)=>state.User);
    const [comment , setComment ] = useState("");
    const [commentError , setCommentError ] = useState("");

    

    const fetchPostComment = async():Promise<getCommentsPerPost[]>=>{
      try{
      const res = await fetch(`/api/comment/getPostComments/${postId}`)
      if(res.ok){
        const data:getCommentsPerPost[] = await res.json();
        return data;
      }
      throw new Error("error in fetching comments");
      }catch(e){
        throw e;
      }
    }
     
    const createComment = async(data:{content:string,userId:string,postId:string})=>{
     try{
       const res= await fetch(`/api/comment/create`,{
            method:'POST',
            headers: { "Content-type": "application/json" },
            body:JSON.stringify(data)
        })
        
        if(res.ok){
               const data = await res.json();
               
               setComment("");
               return data;
        }
     }catch(e){
      console.error(e);
      setCommentError("Eroor there");
     }
    } 

    const {mutate}= useMutation(createComment,{
       onSuccess:()=>{
        refetch();
       } 
    }) 
    const {data:CommentsArray,refetch} = useQuery([`allComments`,`${postId}`],fetchPostComment,{
      refetchOnWindowFocus:false,
    });  
   const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(comment.length>200){
        setCommentError("Comment length must be less than 200")
        return;  
    }
     mutate({content:comment,userId:user?._id as string,postId})
   }
    return (
    <>
    {user ? ( <div className="flex gap-3 mt-4 p-5 flex-col text-gray-600 max-w-4xl mx-auto">
       <div className="flex items-center gap-3">
       <span className="text-sm">Sign in and as</span>
        <div className="img max-w-5 max-h-5 rounded-full">
            <img src= {`${user.profilePicture}`} className="object-cover w-full" />
        </div>
        <Link
            to={'/dashboard?tab=Profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{user.username}
          </Link>
       </div>
      <div className="comment Section">
        <form  onSubmit={handleSubmit} className="border-2 p-2 border-teal-500" >
            <Textarea
            placeholder="Write a comment"
            rows={3}
            maxLength={200}
            value={comment}
            onChange={e=>setComment(e.target.value)}
            ></Textarea>
            <div className="flex gap2 items-center justify-between p-2">
             <span className="text-sm text-teal-500">   {200 - comment.length} words left</span>
             <Button type="submit" outline >Submit</Button>
            </div>
        </form>
      </div>
       {commentError && <Alert>{commentError}</Alert>}
    </div>):(<div className="p-4">Need to <Link className="text-sm text-teal-500" to= "/Sign-in">Sign in</Link></div>)}
     
     {CommentsArray && CommentsArray?.length > 0 && (
     <div className="displayComments px-12 py-6">
      <div className="total flex gap-1">
        Comments <span className="text-sm border-2 px-1 border-gray-300">{CommentsArray.length} </span>
        </div>
      {CommentsArray.map(C=>(<Comment key={C._id} commentData = {C}  refetch = {refetch} ></Comment>))}
     </div>)}

     
     </>);
}
    


    
    
    
    


export default CommentSection