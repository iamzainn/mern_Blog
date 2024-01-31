import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import Auth from "../Components/Auth";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err,setErr] = useState("");

  const navigate = useNavigate();
  const signUpMutation = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json?.();
      

     
      return data;
    } catch (error) {
      
      console.error(error);
      throw error;
    }
  };

  const { mutate,isLoading,isError,error } = useMutation<any, Error, { username: string; email: string; password: string }>(
    signUpMutation,
    {
      onSuccess: (data) => {
        
      if(data.status ==="error"){
        console.log(data);
        setErr((data.message));
        return
      }
       setErr("")
       setUsername("")
       setEmail("")
       setPassword("");
       navigate("/sign-in");
      },
    }
  );
   

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = {
        username,
        email,
        password,
      };

      mutate(userData);
    } catch (e) {
    }
  };

  return (
    <div className="min-h-screen mt-20 flex flex-col gap-2 md:mx-auto max-w-3xl md:flex-row md:items-center">
      <div className="left flex p-3 flex-col md:flex-1  md:items-start md:justify-center">
        <Link
          to="/"
          className="text-2xl sm:text-4xl
        font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-center">
            My
          </span>
          blog's
        </Link>
        <p className="text-sm mt-5">
          This is demo Project. You can here you can sign up with email or with
          Google
        </p>
      </div>
      <div className="right p-3 md:flex-1">
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <div>
            <Label value="Your Username"></Label>
            <TextInput
            value={username}
              placeholder="Enter your username here.."
              id="username"
              onChange={(e)=>setUsername(e.target.value)}
              type="text"
            ></TextInput>
          </div>
          <div>
            <Label value="Your Email"></Label>
            <TextInput
            value={email}
              placeholder="Enter your Email here.."
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              type="email"
            ></TextInput>
          </div>
          <div>
            <Label value="Your Password"></Label>
            <TextInput
            value={password}
              type="password"
              placeholder="Enter your Password here.."
              onChange={(e)=>setPassword(e.target.value)}
              id="password"
            ></TextInput>
          </div>
          <Button
            
            className="my-4"
            gradientDuoTone={"purpleToPink"}
            type="submit"
            disabled = {isLoading}
          >
            {isLoading? (<><Spinner size={"sm"}></Spinner> <span className="px-2">Loading...</span></>):"Sign Up"}
             
          </Button>
          <Auth></Auth>
          
         
          {err || isError ?<Alert  className="mt-5" color="failure">{err} {error?.message}</Alert>:null}

        </form>
        <div>
          <span className="text-sm">
            Have An Account?
            <Link to="/Sign-in" className="text-blue-500 px-1 text-sm">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
