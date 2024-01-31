import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type userType = {
    _id:string ,
    username:string ,
    exEmail:string ,
    profilePicture: string ,
    isAdmin : boolean 
}
type UserState = {
    user:userType | null
}

const initialState : UserState = {
  //  user:{_id:localStorage.getItem("id"),username:localStorage.getItem("username"),exEmail:localStorage.getItem("email"),profilePicture:localStorage.getItem("profilePicture"),isAdmin:localStorage.getItem("isAdmin") as null}
user: localStorage.getItem("user") as null
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
       SetUser : (state,action:PayloadAction<userType>)=>{
         state.user = action.payload 
       },
       deleteUser : (state)=>{
        state.user =initialState.user;
       }  
    },
  })
  
  export const { SetUser, deleteUser } = userSlice.actions;
  
  export default userSlice.reducer