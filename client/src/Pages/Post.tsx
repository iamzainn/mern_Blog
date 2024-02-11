import {  Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import CallToAction from '../Components/CallToAction';
import { postType } from '../Types/types';
import CommentSection from '../Components/CommentSection';
import PostCard from '../Components/PostCard';


export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [post, setPost] = useState<postType>({}as postType);
  const [recentPosts, setRecentPosts] = useState([]as postType[]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
   
      
    <>
    <section className='min-h-screen flex-col flex max-w-3xl mx-auto p-3 gap-6 mt-8'>
      <h1 className='font-semibold text-2xl text-center break-words overflow-auto'>
         { post.title}
      </h1>
      <span className='border-2 p-2 text-center self-center rounded-full'>{post.Category}</span>
      <div className="img">
        <img src={`${post.img}`} alt="post" />
      </div>
      <div className="time flex justify-between px-5 text-gray-500 text-sm"> 
       <p>{new Date(post.createdAt).toLocaleDateString()}</p>
       <p>{(post.Content.length/1000).toFixed(0)} mins read</p>
      </div>
      <br />
      <div className="post-content break-words overflow-auto " dangerouslySetInnerHTML={{__html:post.Content}}></div>
    </section>
    <div><CallToAction></CallToAction></div>
    <div className='commentSection'>
      <CommentSection postId={`${post._id}`}></CommentSection>
    </div>
    <section>
    <div className="text-center font-semibold text-xl heading my-6">Recent Posts</div>
    <div className='p-2 recent mt-8 flex w-full gap-6 mx-auto flex-wrap justify-center'>
    
        {recentPosts.map(post=><PostCard key={post._id} post={post}></PostCard>)}  
    </div>
    </section>
    
    </>
    
  );
}