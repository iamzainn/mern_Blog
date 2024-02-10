import { useQuery } from "react-query";
import { UserType, getUsersType } from "../Types/types";
import { getUsers } from "../Functions/apis";


export const useFetchUsers = (setUsers:React.Dispatch<React.SetStateAction<UserType[]>>,setShowMore: React.Dispatch<React.SetStateAction<boolean>> | undefined,limit = 9)=>{
const {data,isLoading,refetch,isFetching}= useQuery<getUsersType>({
    queryKey:['AllUsers'],
    queryFn:()=>getUsers(0,limit),
    onSuccess:(data)=>{
        setUsers(data.users);
        if(limit===9){
        if(data.users.length<9 && setShowMore){   
          setShowMore(false);
          return
        }
        setShowMore && (setShowMore(true));
     }
    },
    refetchOnWindowFocus:false
  })

  return {data,isLoading,refetch,isFetching};
}
export const fetchMoreUsers = async(users:UserType[],setUsers:React.Dispatch<React.SetStateAction<UserType[]>>,setShowMore:React.Dispatch<React.SetStateAction<boolean>>,setShowMoreLoad:React.Dispatch<React.SetStateAction<boolean>>)=>{
  setShowMoreLoad(true)
 try{
    const data = await getUsers(users.length);   
    if(data.users.length<9){
      setShowMore(false);
    }
    setUsers((previous)=>{return [...previous,...data.users]})
    setShowMoreLoad(false);

 }catch(e){
    console.log(e);
 }
}


