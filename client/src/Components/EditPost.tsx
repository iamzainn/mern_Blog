import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useParams } from "react-router-dom";

type formDataType = {
  img :string | null,
  title:string,
  Content:string,
  Category:string|null,
}


const EditPost = () => {
    const {user} = useSelector((state:RootState)=>state.User);
  const {postId} = useParams()
  const navigate = useNavigate();
  const [file,setFile ] = useState<any>();
  const [error,setError] = useState("")
  const [formData,setFormData] = useState({} as formDataType)
  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(0)
  const [imageFileUploadingError,setImageFileUploadingError] = useState<null | string>("")
  console.log(formData);

  useEffect(()=>{
    const fetchPostDetails = async () => {
  
        try {
          const response = await fetch(`/api/post/getPosts/?postId=${postId}`, {
            method: "GET",
          });
          
          if (response.ok) 
          {
            
            const data = await response.json();
            
            const{img,title,Content,Category}=(data.posts[0])
            setFormData({img,title,Content,Category});
            return;
          }
          
      
          throw new Error("Failed to fetch data");
        } catch (error) {
          throw error;
        }
      };
    if(user?.isAdmin)
    fetchPostDetails();
  },[])
   
  const changeFormData = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
   setFormData((previous)=>{return {...previous,[e.target.id]:e.target.value}});
  }
  const updatePost = async()=>{
    try{
       const res = await fetch(`/api/post/update/${user?._id}/${postId}`,{
        method: "POST",
        headers: { "Content-type": "application/json" },
        body:JSON.stringify(formData)
        
       })
       if(res.ok){
        const data = await res.json?.();
        if(data.status ==="error"){
          setError(data.message);
          return;
        }
       setFormData({}as formDataType);
       navigate(`/post/${data.post.slug}`);
      }

    }catch(error){
      console.error(error)
      
    }
  }

 
  const submitEvent  = async(e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   updatePost();

  }
  const changeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
   
  
    if(e.target.files){
      setFile(e.target.files[0]);
     }
    }
    const uploadImage =()=> {
    if(!file){
      setImageFileUploadingError("upload an Image")
   return
    }
    const storage = getStorage(app);
    const filename = new Date().getTime()+'-' + file.name
    const storageref = ref(storage,filename);
         const uploadTask = uploadBytesResumable(storageref,file)
         uploadTask.on(
          'state_changed',
          (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadingProgress(parseInt(progress.toFixed(0)));
          },
          (err)=>{
            
            setImageFileUploadingError(err.message)
            setImageFileUploadingProgress(0);
          },
          ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
           setImageFileUploadingProgress(0);
           setImageFileUploadingError(null);
           setFormData((pre)=>{return {...pre,img:url}})
          })
          }
         ) 

    }
    
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3 border-2 border-gray-700">
      <h2 className="text-center text-lg mb-6 font-semibold">Edit Post</h2>
      <form className="flex flex-col gap-4" onSubmit={submitEvent}>
       <div className="textForm flex flex-col sm:flex-row justify-between gap-4">
       <TextInput type="text" className="flex-grow" required id="title" value={formData.title} onChange={changeFormData} placeholder="Add a Title"></TextInput>
       <Select id="Category" value={formData.Category ??"uncategorized"} className=""onChange={(e)=>changeFormData(e)} required>
       <option value={"uncategorized"} >Select a Category</option>
        <option value={"javascript"}>Javascript</option>
        <option value={"react"}>React</option>
        <option value={"nextjs"}>Next js</option>
        </Select>
        </div>
        <div className="image flex flex-row justify-between gap-3 border-4 items-center p-2 border-dotted border-teal-500">
          <FileInput accept="image/*" onChange={changeFile}></FileInput>
          <Button  type = "button" gradientDuoTone={"purpleToBlue"} outline  onClick={uploadImage} disabled={!!imageFileUploadingProgress}>
           {imageFileUploadingProgress?(<div className="w-16 h-16">
            <CircularProgressbar value={imageFileUploadingProgress} text={`${imageFileUploadingProgress} %`}></CircularProgressbar>
 </div>):("Upload an Image")} 
           
          </Button>
        
        </div>
        {formData.img && <img src= {`${formData.img}`}></img>}
          {imageFileUploadingError && <Alert color={"failure"}>{imageFileUploadingError}</Alert>}
        <ReactQuill theme="snow" className="min-h-72" id="Content" value={formData.Content} onChange={(value)=>{setFormData((pre)=>{return {...pre,'Content':value}})}}/>
        <Button  type = "submit" gradientDuoTone={"purpleToPink"} outline >Update</Button>
      </form>
      {error && <Alert className="mt-8" color={"failure"}>{error}</Alert>}
    </div>
  )
}

export default EditPost
