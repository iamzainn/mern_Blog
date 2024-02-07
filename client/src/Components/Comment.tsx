import { useEffect} from "react";
import { UserType, getCommentCompProps, getCommentsPerPost } from "../Types/types"
import { useState } from "react";
import moment from "moment";
import { useSelector, } from "react-redux";
import { RootState } from "../app/store";

import { Alert, Button, TextInput } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
const Comment:React.FC<getCommentCompProps> = ({commentData}) => {
const [ comment,setComment] = useState(commentData);
 const [userComment,setUserComment] = useState<UserType>({}as UserType);
 const [commmentContent,setCommmentContent] = useState<string>("");
 
 const [error,setError] = useState("");
 const [editModel,setEditModel] = useState(false);
 


 const click = ()=>{
 setEditModel(true);
 }
 const editComment = async (commentId:string, userId:string,) => {
  try {
   
    const res = await fetch(`/api/comment/edit/${userId}/${commentId}`, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({content:commmentContent})
    });

    if (res.ok) {
      const data = await res.json();
      setComment(data);
      setEditModel(false);
    }
  } catch (e) {
    console.log(e);
  }
}

 
const {user} = useSelector((state:RootState)=>state.User)
console.count();

  useEffect(()=>{
    const fetchDetailsOfUser = async()=>{
      try{
       const res =  await fetch(`/api/user/getUser/${commentData.userId}`)
       if(res.ok){
          const data:UserType = await res.json();
          setUserComment(data);
          return data;
       }
      }catch(e){
          console.log(e);
      }
  }
    setCommmentContent(commentData.content)
   fetchDetailsOfUser();
  },[commentData._id])
   
    const toggleLike = async()=>{
    if(!user){
      setError("Sign in first");
      setTimeout(()=>{
       setError("");
      },1000)
      return
    }
    
   if(user){
     try{
      const res = await fetch(`/api/comment/likeComment/${comment._id}`,{
        method:'PUT'
      })
      if(res.ok){
        const data:getCommentsPerPost = await res.json();
        setComment(data);
      }
     }catch(e){

     }
   }
    }

   
  return (
    <div className="comment mt-6 flex flex-col gap-2">
       <div className="userImg flex gap-2 items-baseline">
       <img className="w-6 h-6 rounded-full object-cover" src={`${userComment.profilePicture}`} alt="" />
       <span className= "text-xs text-gray-400">@{userComment.username}</span>
       <span className= "text-[0.59rem]">{moment(comment.createdAt).fromNow()}</span>
       </div>
          <div className="flex-1">{editModel ? (
          <>
          <TextInput type= "text" value={commmentContent} onChange={(e)=>setCommmentContent(e.target.value)}></TextInput>
         <div className="flex gap-3 flex-1 items-baseline ">
         <span className="mt-5 text-sm">{200 - commmentContent.length} words left</span>
         <Button onClick={()=>{editComment(comment._id,user?._id||"")}} color="success"  className="disabled:opacity-30" disabled={!commmentContent} outline type = "button">Submit</Button>
         </div>
          </>):
          
          
          
          (<span className="border-b-2 w-full">{commmentContent}</span>)} </div>
       <div className="mt-2 btns text-xs flex gap-3 items-center text-gray-500">
        <button type="button" onClick={toggleLike} className="text-gray-600 hover:text-blue-800"><FaThumbsUp></FaThumbsUp></button>
       {comment.numberOfLikes > 0 && <span className="text-xl">{comment.numberOfLikes}</span> } 
       {comment.userId === user?._id && (<> <button className="disabled:opacity-30" disabled = {editModel} onClick={click}>Edit</button>
        <span>Delete</span></>)} 
       </div>
      {error && <Alert className="text-sm">{error}</Alert>}
       </div>
    
  )
}

export default Comment
