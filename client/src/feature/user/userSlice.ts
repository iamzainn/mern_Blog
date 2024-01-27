import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type userType = {
    _id:string | null,
    username:string | null,
    exEmail:string | null
}
type UserState = {
    user:userType | null
}

const initialState : UserState = {
   user:{_id:localStorage.getItem("id"),username:localStorage.getItem("username"),exEmail:localStorage.getItem("email")}
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
       SignIn : (state,action:PayloadAction<userType>)=>{
         state.user = action.payload 
       },
       SignOut : (state)=>{
        state.user = null;
       }  
    },
  })
  
  export const { SignIn } = userSlice.actions
  
  export default userSlice.reducer