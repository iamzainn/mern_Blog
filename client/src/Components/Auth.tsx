import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth"
import { app } from "../firebase"
import { useMutation } from "react-query";
import { localUser } from "../Functions/localsStorage"
import { useDispatch } from "react-redux"
import { SetUser as userSignIn } from "../feature/user/userSlice";
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const authMutation = async (userData: {
        username: string;
        email: string;
        profilePicture:string
      }) => {
        try {
          const response = await fetch("/api/auth/google", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userData),
          });
           if(response.ok){
            const data = await response.json?.();
            return data;
           }
        } catch (error) {
          
         
          throw error;
        }
      };

      const { mutate } = useMutation<any, Error, { username: string; email: string; profilePicture: string }>(
        authMutation,
        {
          onSuccess: (data) => { 
          if(data.status ==="error"){
            
            return
          }
        
       dispatch(userSignIn(data.user))
       localUser(data.user);
       navigate("/")
          },
        }
      );



   const handleGoogleAuth = async()=>{
    const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'})
     try{
      const resultFromGoogle = await signInWithPopup(auth,provider);
      
      const data = {
        username : resultFromGoogle.user.displayName || "",
        email:resultFromGoogle.user.email || "",
        profilePicture:resultFromGoogle.user.photoURL || ""
      }
      
      mutate(data)
     }catch(error){
       
     }
   
    }



   

  return (
    
      <Button onClick={handleGoogleAuth} type="button" gradientDuoTone={"pinkToOrange"} outline><AiFillGoogleCircle className="text-sm mr-1 flex items-center w-6 h-6"></AiFillGoogleCircle>Continue with Google</Button>
  
  )
}

export default Auth
