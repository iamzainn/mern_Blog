import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type userType = {
    _id:string | null,
    username:string | null,
    exEmail:string | null,
    profilePicture: string | null,
    isAdmin : boolean | null
}
type UserState = {
    user:userType | null
}

const initialState : UserState = {
   user:{_id:localStorage.getItem("id"),username:localStorage.getItem("username"),exEmail:localStorage.getItem("email"),profilePicture:localStorage.getItem("profilePicture"),isAdmin:localStorage.getItem("isAdmin") as null}
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
       SignIn : (state,action:PayloadAction<userType>)=>{
         state.user = action.payload 
       },
       deleteUser : (state)=>{
        state.user =initialState.user;
       }  
    },
  })
  
  export const { SignIn, deleteUser } = userSlice.actions;
  
  export default userSlice.reducer