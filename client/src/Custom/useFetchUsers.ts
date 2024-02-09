import { useQuery } from "react-query";
import { UserType, getUsersType } from "../Types/types";
import { getUsers } from "../Functions/apis";



export const useFetchUsers = (setUsers:React.Dispatch<React.SetStateAction<UserType[]>>,setShowMore: React.Dispatch<React.SetStateAction<boolean>>,limit = 9)=>{
const {data,isLoading,refetch,isFetching}= useQuery<getUsersType>({
    queryKey:['AllUsers'],
    queryFn:()=>getUsers(undefined,limit),
    onSuccess:(data)=>{
     if(limit===9){
        setUsers(data.users);
        if(data.users.length <9){   
           setShowMore(false)
          return
        }
         setShowMore(true);
     }
    },
    refetchOnWindowFocus:false
  })

  return {data,isLoading,refetch,isFetching};
}



