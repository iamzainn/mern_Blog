import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from "../firebase";
function DashProfile() {
  const { user } = useSelector((state: RootState) => state.User);
  const imgRef = useRef<HTMLInputElement>(null!)
  const [imgFiles,setImgFiles] = useState<any>();
  const [imgUrl,setImgUrl] = useState<string>("");
  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(0)
  const [imageFileUploadingError,setImageFileUploadingError] = useState<null | string>("")
  const [foamData , setFormData] = useState({})

  const setImgData = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if( e.target.files){
        const file = e.target.files[0];
        setImgFiles(file)
        setImgUrl(URL.createObjectURL(file))
    }
  }

  const uploadImage = async()=>{
     setImageFileUploadingError("")
    try{
     const storage = getStorage(app);
     const filename = new Date().getTime()+ imgFiles.name
    const storageref= ref(storage,filename);
    const uploadtask = uploadBytesResumable(storageref,imgFiles);
    uploadtask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(parseInt(progress.toFixed(0).toString()))
      },
      (error)=>{
       setImageFileUploadingError(error.message);
       setImageFileUploadingProgress(0);
       setImgFiles(null)
      },
      ()=>{
        getDownloadURL(uploadtask.snapshot.ref).then(url=>{setFormData(prev=>{return {...prev,'profilePicture':url}});
         
      })
       
      }
    )
    }catch(e){

    }
  }
  useEffect(()=>{
  if(imgFiles){
    uploadImage();
  }
  },[imgFiles])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setFormData((previous)=>{return {...previous,[e.target.id]:e.target.value}})
  }
  
   const submit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

   }

  return (
    <div className="flex-grow py-8">
      <h1 className=" font-semibold text-center text-sm md:text-xl mb-4">
        Profile
      </h1>
      <form className="flex gap-4 flex-col" onSubmit={submit}>
        <input type="file" ref={imgRef} className="hidden" accept="image/*"  onChange={setImgData}/>
     
        
        <div className="img w-32 h-42 self-center relative" onClick={()=>imgRef.current.click()}>
          {imageFileUploadingProgress!==0 && (<CircularProgressbar value={imageFileUploadingProgress}text={`${imageFileUploadingProgress}%`} strokeWidth={5} styles={{root:{width:'100%',height:'100%',position:'absolute', top:0, left:0},path:{opacity:`rgba(24,44,34,${imageFileUploadingProgress/100})`}}}></CircularProgressbar>)}
          <img 
            src={imgUrl || `${user?.profilePicture}`}
            alt="ProfilePicture"
            className={`rounded-full object-cover min-w-full min-h-full bg-[lightGrey] ${imageFileUploadingProgress<100 && 'opacity-30'}`}
          />
        </div>
        {imageFileUploadingError &&<Alert  className="mt-5" color="failure">{imageFileUploadingError}</Alert>}
        <TextInput
          type="text"
          id="username"
          defaultValue={user?.username || ""}
          onChange={handleChange}
        ></TextInput>
        <TextInput 
          type="email"
          id="email"
          defaultValue={user?.exEmail || ""} onChange={handleChange}
        ></TextInput>
        <TextInput 
          type="password"
          id="password"
           placeholder="**********"  onChange={handleChange}
        ></TextInput>
        <Button disabled = {Object.keys(foamData).length ===0} type = "submit" gradientDuoTone={"purpleToBlue"} outline>Update</Button>
      </form>
      <div className="btn mt-5 flex justify-between px-2">
        <span className="text-red-500">Delete Account</span>
        <span className="text-red-500">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
