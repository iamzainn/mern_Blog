import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun } from "react-icons/fa";
import Footer from "./Footer";
import { useSelector ,useDispatch} from "react-redux";
import type { RootState } from "../app/store";
import { Avatar, Dropdown } from 'flowbite-react';
import { SignoutAcc } from "./DashProfile"; 
import { toggleTheme } from "../feature/theme/themeSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const {theme}= useSelector((state:RootState)=>state.theme)
   const dispatch = useDispatch();
   const location = useLocation();
   console.log(location);
  const pth = useLocation().pathname;
  const {user} = useSelector((state:RootState)=>state.User);
  const [searchTerm,setSearchTerm] = useState("")
  const navigate = useNavigate();
  


   useEffect(()=>{
    
  const searchT=  new URLSearchParams(location.search)
  const d = searchT.get("searchTerm")
  if(d){
    setSearchTerm(d);
  }
  
   },[location.search])

   const Submit =(e: React.FormEvent<HTMLFormElement>)=>{
    
    e.preventDefault();
     if(searchTerm){
      const URLParam = new URLSearchParams(location.search);
      
      URLParam.set(`searchTerm`,searchTerm);
      navigate(`/search?searchTerm=${URLParam.get("searchTerm")}`);
     }

   }
  
    return (
    <>
      <Navbar className="border-b-2 px-4 flex-wrap">
        <div className="logo flex items-center justify-center whitespace-nowrap sm:text-lg xl:text-2xl font-semibold">
          <Link to="/">
            <span className="px-1 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-center">
              My
            </span>
            Logo
          </Link>
        </div>
        <div className="search flex gap-2">
          <Button className="lg:hidden" pill color="light">
            <AiOutlineSearch className="text-sm"></AiOutlineSearch>
          </Button>
          <form className="hidden lg:block" onSubmit={Submit}>
            <TextInput
              type="text"
              
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              placeholder="Search Here"
              rightIcon={AiOutlineSearch}
            ></TextInput>
          </form>
        </div>

        <div className="hamburgerBtns flex gap-2 md:order-5">
          <Button className="hidden sm:block" pill color="light" onClick={()=>dispatch(toggleTheme())}>
            {theme ==='light' ?<FaMoon className="text-sm"></FaMoon>:<FaSun className="text-sm"></FaSun>}
          </Button>
          {user?._id?
          (
            <Dropdown
            label={<Avatar alt="User settings" img={user.profilePicture ?? ""} rounded />}
            arrowIcon={false}
            inline
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">{user?.exEmail}</span>
            </Dropdown.Header>
            <Link to = {"/dashboard?tab=Profile"}>
            <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={()=>SignoutAcc(user?._id as string,dispatch)}>Sign out</Dropdown.Item>
          </Dropdown>
          ):
          <Link to = "/Sign-in" >
          <Button  outline gradientDuoTone="purpleToPink">
           Sign in
          </Button>
          </Link>
          }
          
          <Navbar.Toggle></Navbar.Toggle>
        </div>

        <Navbar.Collapse>
          <Navbar.Link active={pth === "/"} as={"div"}>
            <NavLink to="/">Home</NavLink>
          </Navbar.Link>
          <Navbar.Link active={pth === "/about"} as={"div"}>
            <NavLink to="/about">About</NavLink>
          </Navbar.Link>
          <Navbar.Link active={pth === "/projects"} as={"div"}>
            <NavLink to="/projects">Projects</NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Header;
