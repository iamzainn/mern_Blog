import {userType} from '../feature/user/userSlice'

export const localUser = (user:userType)=>{
  localStorage.setItem("id",user?._id || "");
  localStorage.setItem("email",user?.exEmail || "");
  localStorage.setItem("username",user?.username ||"");
  localStorage.setItem("profilePicture",user?.profilePicture ||"");
}
export const signOutlocalUser = ()=>{
  localStorage.setItem("id","");
  localStorage.setItem("email","");
  localStorage.setItem("username","");
  localStorage.setItem("profilePicture","");
}
export const remOutlocalUser = ()=>{
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  localStorage.removeItem("profilePicture");
}