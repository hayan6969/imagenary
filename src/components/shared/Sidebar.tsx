'use client'
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navLinks } from "../../../constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname=usePathname()
  return <aside className="sidebar">
    <div className="flex size-full flex-col  items-center gap-4">
        <Link href={'/'} className=" sidebar-logo">
        <Image
        src='/assets/images/imagenary.png'
        alt='Logo'
        width={200}
        height={100}
        />
        </Link>

        <nav className="sidebar-nav">
            <SignedIn>
               <ul className="sidebar-nav_elements">
                {
                    navLinks.map((link)=>{
                        const isActive = link.route ===pathname
                        return (
                            <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white':'text-gray-700'}`}>
                                {link.label}
                            </li>
                        )
                    })
                }
                </ul> 
            </SignedIn>
        </nav>
    </div>
  </aside>;
};

export default Sidebar;
