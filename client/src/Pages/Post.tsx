import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../Components/CallToAction';
import { postType } from '../Types/types';
import CommentSection from '../Components/CommentSection';


export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<postType>({}as postType);
  const [recentPosts, setRecentPosts] = useState(null);

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
    // <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    //   
    //   <Link
    //     to={`/search?category=${post && post.Category}`}
    //     className='self-center mt-5'
    //   >
    //     <Button color='gray' pill size='xs'>
    //       {post && post.Category}
    //     </Button>
    //   </Link>
    //   <img
    //     src={post && post.img}
    //     alt={post && post.title}
    //     className='mt-10 p-3 max-h-[600px] w-full object-cover'
    //   />
    //   <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
    //     <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
    //     <span className='italic'>
    //       {post && (post.Content.length / 1000).toFixed(0)} mins read
    //     </span>
    //   </div>
    //   <div
    //     className='p-3 max-w-2xl mx-auto w-full post-content'
    //     dangerouslySetInnerHTML={{ __html: post && post.Content}}
    //   ></div>
      
      
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
      <div className="post-content" dangerouslySetInnerHTML={{__html:post.Content}}></div>
    </section>
    <div><CallToAction></CallToAction></div>
    <div className='commentSection'>
      <CommentSection postId={`${post._id}`}></CommentSection>
    </div>
    </>
    
  );
}