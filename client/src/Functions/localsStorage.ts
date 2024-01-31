import {userType} from '../feature/user/userSlice'

export const localUser = (setuser:userType)=>{
  localStorage.setItem("user",JSON.stringify(setuser));
}
export const signOutlocalUser = ()=>{
  localStorage.setItem("user",String(null));
}
export const remOutlocalUser = ()=>{
 localStorage.removeItem("user")
}