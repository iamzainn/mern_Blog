import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getPostsType, postType } from "../Types/types";
import { getPosts } from "../Functions/apis";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import PostCard from "../Components/PostCard";
import { useNavigate } from "react-router-dom";


const Search = () => {

    const {} = useSelector((state:RootState)=>state.User);
    const location = useLocation(); 
    const navigate = useNavigate();
    const [searchData,setSearchData] = useState({
        searchTerm : "",
        order:'',
        Category:'Uncategorized'
      })
      const [Posts,setPosts] = useState<postType[]>([] as postType[])
const [showMore,setShowMore] = useState(true);
const [showMoreLoad,setShowMoreLoad] = useState(false);


const {isLoading,refetch} =useQuery<getPostsType>({
    queryKey:['AllPosts'],
    queryFn:()=>getPosts("",0,undefined,searchData.Category,searchData.searchTerm,searchData.order),
    onSuccess:(data)=>{
      setPosts(data.posts);
      if(data.posts.length <9){
        setShowMore(false);
        return
      }
      setShowMore(true);

    },
    refetchOnWindowFocus:false
  })
  const fetchMorePosts = async()=>{
    setShowMoreLoad(true)
   try{
      const data = await getPosts("",Posts.length,undefined,searchData.Category,searchData.searchTerm,searchData.order);
      if(data.posts.length<9){
        setShowMore(false);
      }
      setPosts((previous)=>{return [...previous,...data.posts]})
      setShowMoreLoad(false);

   }catch(e){
      console.log(e);
   }
  }

    

    useEffect(()=>{
        
        const urlParam = new URLSearchParams(location.search);
         const s = urlParam.get("searchTerm") as string;
         const sort = urlParam.get("sort") as string;
         const Category = urlParam.get("Category") as string;
         if(s || sort || Category ){
           setSearchData(pre=>{return {...pre,searchTerm:s,sort,Category}})
         }
    },[location.search]);

      

  const searchForm = (e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
  const urlParam= new URLSearchParams(location.search);
   urlParam.set("searchTerm",searchData.searchTerm);
   urlParam.set("order",searchData.order);
   urlParam.set("Category",searchData.Category);
   
   navigate(`/search?${urlParam.toString()}`)
   refetch();
    
  }


  return (
    <form onSubmit={searchForm} className="min-h-screen flex flex-col sm:flex-row">
    <div className="sidebar bg-slate-200 p-5 basis-50 flex flex-col gap-4 dark:bg-slate-700 text-gray-100" >
       <div>
       <TextInput  type="text"placeholder="Search..." value={searchData.searchTerm} id="searchTerm" onChange={(e)=>setSearchData(pre=>{return {...pre,[e.target.id]:e.target.value}})} className=""></TextInput>
       </div>
       <div >
       <Select id="Category" value={searchData.Category||"Uncategorized"} className=""onChange={(e)=>setSearchData(pre=>{return {...pre,[e.target.id]:e.target.value}})}>
       <option value={"Uncategorized"} >Uncategorized</option>
        <option value={"javascript"}>Javascript</option>
        <option value={"react"}>React</option>
        <option value={"nextjs"}>Next js</option>
        </Select>
       </div>
       <div className="sort">
       <Select id="order" value={searchData.order||""} className=""onChange={(e)=>setSearchData(pre=>{return {...pre,[e.target.id]:e.target.value}})}>
       
        <option value={"asc"}>Oldest</option>
        <option value={"dsc"}>Latest</option>
        </Select>
       
       </div>
       <Button type = {"submit"}>Search</Button>
    </div>

    <div className="posts p-5 flex-grow-[5] ">
{!isLoading && (Posts.length) ?(
<>

    <div className="flex flex-wrap gap-5">
        {Posts.map((post)=>{
            return <PostCard key={post._id} post={post}></PostCard>
        })}
     </div>
     
     {(showMore && Posts.length>0) ? <div className="flex min-w-full justify-center my-2"> {showMoreLoad ? ( <Spinner size={'md'} aria-label="Center-aligned spinner example" />):(<Button type="button" className="text-centre text-white" onClick={fetchMorePosts} color="success">Show More</Button>)}</div>:(<></>)}

</>):(

<p>
Post not Avaliable
</p>

)}

    </div>
    </form>
  )
}

export default Search
