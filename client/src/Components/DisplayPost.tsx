import { Table} from "flowbite-react";
import { useQuery } from "react-query";
import { UseSelector, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

type getPostsType = {
  posts: {
    _id: string;
    title: string;
    Category:string
    Content: string;
    img: string;
    userId: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    _v: 0;
  }[];
  totalPosts: number;
  lastMonthPosts: number;
};

const DisplayPost = () => {
 
const {user} = useSelector((state:RootState)=>state.User);
const getPosts = async () => {
  try {
    const response = await fetch(`api/post/getPosts`, {
      method: "GET",
    });

    if (response.ok) {
      const data: getPostsType = await response.json();
      
      return data;
    }

    throw new Error("Failed to fetch data");
  } catch (error) {
    throw error;
  }
};


  const {data}=useQuery<getPostsType>({
    queryKey:['AllPosts'],
    queryFn:getPosts
  })
  return (
    <>
    {data?.totalPosts && user?.isAdmin ?( <div className="overflow-x-auto mt-4 table-auto md:mx-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          
        </Table.Head>
        
        <Table.Body className="divide-y">
          {data?.posts.map((post)=>{
            return <Table.Row key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {new Date(post.updatedAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell><img className="max-w-24 max-h-24 object-cover" src={`${post.img}`}></img></Table.Cell>
            <Table.Cell><Link to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
            <Table.Cell>{post.Category}</Table.Cell>
            <Table.Cell><span className="font-medium text-red-500 cursor-pointer">Delete</span></Table.Cell>
            <Table.Cell><Link className="cursor-pointer text-teal-500" to ={`/update-post/${post._id}`}><span>Edit</span></Link></Table.Cell>
            </Table.Row>
          })}
         
        </Table.Body>
      </Table>
    </div>  ):(<p>Zero post</p>)}
    </>
  );

  

 

};

export default DisplayPost
