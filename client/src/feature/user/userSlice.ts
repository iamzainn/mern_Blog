import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserType = {
  _id: string;
  username: string;
  exEmail: string;
  profilePicture: string;
  isAdmin: boolean;
};

type UserState = {
  user: UserType | null;
};

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { SetUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
