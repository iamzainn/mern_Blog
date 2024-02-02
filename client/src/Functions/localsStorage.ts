import { UserType } from '../feature/user/userSlice';

export const localUser = (setuser: UserType) => {
  localStorage.setItem('user', JSON.stringify(setuser));
};

export const signOutLocalUser = () => {
  localStorage.setItem('user', JSON.stringify(null));
};

export const removeLocalUser = () => {
  localStorage.removeItem('user');
};
