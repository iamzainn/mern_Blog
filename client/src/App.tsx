import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query";



import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./Components/Header";
import PrivateComponent from "./Components/PrivateComponent";
import AdminOnlyComponent from "./Components/AdminOnlyComponent";
import CreatePost from "./Components/createPost";
import Post from "./Pages/Post";
import EditPost from "./Components/EditPost";




function App() {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element = {<Header></Header>}>
      <Route index element={<Home></Home>}/>
      <Route element = {<PrivateComponent></PrivateComponent>}>
      <Route path="dashboard" element = {<Dashboard></Dashboard>}/>
      </Route>
      <Route element = {<AdminOnlyComponent></AdminOnlyComponent>}>
        <Route path="/create-Post" element = {<CreatePost></CreatePost>}></Route>
        <Route path="/update-post/:postId" element = {<EditPost></EditPost>}></Route>
      </Route>
      <Route path="post" element = {<Post></Post>}>
        <Route path=":postName" element = {<p></p>}></Route>
      </Route>
      <Route path="projects" element = {<Projects></Projects>}/>
      <Route path="sign-in" element = {<SignIn></SignIn>}/>
      <Route path="sign-up" element = {<SignUp></SignUp>}/>
      <Route path="about" element = {<About></About>}/>
      </Route>
      <Route path="*" element = {<h1>Element not found</h1>}></Route>
      </>
         
    )
  );

  return (
    <QueryClientProvider client={client}>
    <RouterProvider router={router}></RouterProvider> 
     
    </QueryClientProvider>
  )
}

export default App
