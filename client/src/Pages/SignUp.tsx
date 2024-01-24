import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"


const SignUp = () => {
  return (
    <div className="min-h-screen mt-20 flex flex-col gap-2 md:mx-auto max-w-3xl md:flex-row">
      <div className="left flex p-3 flex-col md:flex-1  md:items-start md:justify-center">
      <Link to= "/" className="text-2xl sm:text-4xl
        font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-center">My</span>
         blog's
      </Link>
      <p className="text-sm mt-5">
      This is demo Project. You can here you can sign up with email or with Google
      </p>
      </div>
      <div className="right p-3 md:flex-1">
        <form className="flex flex-col">
          <div>
            <Label value ="Your Username"></Label>
            <TextInput placeholder="Enter your username here.." id="username" type="text"></TextInput>
          </div>
          <div>
            <Label value ="Your Email"></Label>
            <TextInput placeholder="Enter your Email here.." id="email" type="email"></TextInput>
          </div>
          <div>
            <Label value ="Your Password"></Label>
            <TextInput type="password" placeholder="Enter your Password here.." id="password"></TextInput>
          </div>
          <Button className="my-4" gradientDuoTone={"purpleToPink"} type= "submit">Sign Up</Button>
        </form>
        <div>
          <span className="text-sm">Have An Account? 
            <Link  className="text-blue-500 px-1 text-sm" to = "/Sign-in">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
