import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../assets/logo.png";

const NavBarItem = ({ title, path, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <Link to={path}>{title}</Link>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <div className="gradient-bg-welcome">
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center
        "
         onClick={()=>{
          window.location.href = "/"
         }}
         style={{cursor:"pointer"}}
        >
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {[
            { title: "Admin Panel", path: "/login" },
            { title: "Bank Panel", path: "/banklogin" },
            { title: "Customer Panel", path: "/userlogin" },
            {title:"Bank Request",path:"/bankform"},
            {title:"Customer Registration",path:"/customerreg"}
          ].map((item, index) => (
            <NavBarItem
              key={item.title + index}
              title={item.title}
              path={item.path}
            />
          ))}
        </ul>
        <div className="flex relative">
          {!toggleMenu && (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {[
                { title: "Market", path: "/market" },
                { title: "Exchange", path: "/exchange" },
                { title: "Tutorials", path: "/tutorials" },
                { title: "Wallets", path: "/wallets" },
              ].map((item, index) => (
                <NavBarItem
                  key={item.title + index}
                  title={item.title}
                  path={item.path}
                  classprops="my-2 text-lg"
                />
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
