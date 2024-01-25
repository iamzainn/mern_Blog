import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query";



import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./Components/Header";


function App() {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element = {<Header></Header>}>
      <Route index element={<Home></Home>}/>
      <Route path="dashboard" element = {<Dashboard></Dashboard>}/>
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
     {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  )
}

export default App
