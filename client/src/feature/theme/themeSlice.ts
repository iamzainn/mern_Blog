import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    theme : 'light'
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
      toggleTheme : (state)=>{
       state.theme = state.theme ==='light'?'dark':'light' 
      }
    },
  })
  
  export const { toggleTheme } = userSlice.actions
  
  export default userSlice.reducer