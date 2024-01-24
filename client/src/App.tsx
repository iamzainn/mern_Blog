import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./Components/Header";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element = {<Header></Header>}>
      <Route index element={<Home></Home>}/>
      <Route path="dashboard" element = {<Dashboard></Dashboard>}/>
      <Route path="projects" element = {<Projects></Projects>}/>
      <Route path="Sign-in" element = {<SignIn></SignIn>}/>
      <Route path="sign-up" element = {<SignUp></SignUp>}/>
      <Route path="about" element = {<About></About>}/>
      </Route>
      <Route path="*" element = {<h1>Element not found</h1>}></Route>
      </>
         
    )
  );

  return (
    <>
    <RouterProvider router={router}></RouterProvider> 
    </>
  )
}

export default App
