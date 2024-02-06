import { useEffect } from "react";
import { UserType, getCommentCompProps } from "../Types/types"


const Comment:React.FC<getCommentCompProps> = ({commentData}) => {

  useEffect(()=>{
    const fetchDetailsOfUser = async()=>{
      try{
       const res =  await fetch(`/api/user/getUser/${commentData.userId}`)
       if(res.ok){
          const data:UserType = await res.json();
          console.log(data);
          return data;
       }
      }catch(e){
          console.log(e);
      }
  }
  console.log("here")
   fetchDetailsOfUser().then(data=>console.log(data))
  },[commentData._id])
   
    

   
  return (
    <div className="comment mt-6 flex flex-col">
       <div className="userImg"></div>
       <img src={``} alt="" />
    </div>
  )
}

export default Comment
