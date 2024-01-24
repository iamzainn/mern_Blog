import { Outlet ,Link,NavLink,useLocation} from "react-router-dom"
import { Fragment } from "react"
import { Button, Navbar, TextInput } from "flowbite-react"

import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


const Header = () => {
  const pth = useLocation().pathname;
  return (
    <Fragment>
    <Navbar className="border-b-2">
      <Link to= "/" className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-center">My</span>
         blog's
      </Link>
      
      <form className="">
        <TextInput className="hidden md:inline-block" type="text" placeholder="search.."rightIcon={AiOutlineSearch}
        ></TextInput>
      </form>
      <Button className="sm:hidden border-2 border-blue-200" pill color="grey"><AiOutlineSearch></AiOutlineSearch></Button>
     <div className="flex gap-2 sm:order-2">
      <Button className="hidden sm:inline-block" pill color="grey">
        <FaMoon></FaMoon>
      </Button>
      <Button gradientDuoTone="purpleToBlue">
        <Link to="/Sign-in">Sign In</Link>
      </Button>
      <Navbar.Toggle></Navbar.Toggle>
     </div>
     <Navbar.Collapse>
      <Navbar.Link active = {pth=="/"} as={"div"}>
        <NavLink to="/" >Home</NavLink>
      </Navbar.Link>
      <Navbar.Link active = {pth=="/about"} as={"div"}>
        <NavLink to="/about">About</NavLink>
      </Navbar.Link>
      <Navbar.Link active = {pth=="/Projects"} as={"div"}>
        <NavLink to="/Projects">Projects</NavLink>
      </Navbar.Link>
     </Navbar.Collapse>
    </Navbar>
    <main>
        <Outlet></Outlet>
    </main>
    </Fragment>
    
  )
}

export default Header
