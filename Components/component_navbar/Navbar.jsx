import Link from "next/link";
//import Image from "next/image";
import React, { useState } from "react";
import NavItem from "./NavItem";
import UserProfile from "./UserProfile";
import { useSession } from 'next-auth/react';
//import { Avatar } from "@nextui-org/react";


const MENU_LIST = [
  { text: "Home", href: "/" }, // Si en el href posses una ruta ex: /api/hello --> si que fnciona 
  { text: "WebManager", href: "/projects/Page_webmanager" },
  { text: "NetDoc", href: "/projects/pageNetDoc" },
  { text: "About me", href: "/" },
  { text: "Contact", href: "/" },


];



const Navbar = () => {
  const { data: session } = useSession();
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav, nav_bg`}>
        <Link href={"/home"}>

          <h1 className="text-4xl font-bold text-blue-500">Nil Projects</h1>

        </Link>

        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}

          {session ? (
            // Render UserProfile component when the user is logged in
            <UserProfile/>
          ) : (
            // Render a different component or message when the user is not logged in
            <Link href="/LoginPage">
              <b>Sign in</b>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;