import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
      <Route index element={<Home></Home>}/>
      <Route path="dashboard" element = {<Dashboard></Dashboard>}/>
      <Route path="projects" element = {<Projects></Projects>}/>
      <Route path="Sign-in" element = {<SignIn></SignIn>}/>
      <Route path="Sign-up" element = {<SignUp></SignUp>}/>
      <Route path="about" element = {<About></About>}/>
      </Route>
         
    )
  );

  return (
    <>
    <RouterProvider router={router}></RouterProvider> 
    </>
  )
}

export default App
