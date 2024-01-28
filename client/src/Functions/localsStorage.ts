import {userType} from '../feature/user/userSlice'

export const localUser = (user:userType)=>{
  localStorage.setItem("id",user?._id || "");
  localStorage.setItem("email",user?.exEmail || "");
  localStorage.setItem("username",user?.username ||"");
  localStorage.setItem("profilePicture",user?.profilePicture ||"");
}