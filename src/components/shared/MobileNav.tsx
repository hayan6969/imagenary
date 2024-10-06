'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { navLinks } from "../../../constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
  

const MobileNav = () => {
    const pathname = usePathname()
  return (
    <header className="header">
<Link href="/" className="flex items-centergap-2 md:py-2">
<Image
src={'/assets/images/imagenary.png'}
alt="Logo"
width={180}
height={28}
/>
</Link>
<nav className="flex gap-2">
<SignedIn>
    <UserButton />
    <Sheet>
  <SheetTrigger>
    <Image
    src={'/assets/icons/menu.svg'}
    alt="Menu"
    width={32}
    height={32}
    className="curspr-pointer"
    />
  </SheetTrigger>
  <SheetContent className="sheet-content overflow-y-auto sm:w-64">
    <>
    <Image
    src={'/assets/images/imagenary.png'}
    alt="Logo"
    width={160}
    height={23}
    />
     <ul className="header-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                    
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                  >
                     <SheetClose key={link.route} asChild>
                    <Link className="sidebar-link cursor-pointer"  href={link.route}>
                    <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}

                        
                      />
                      {link.label}
                    </Link>
                    </SheetClose>
                  </li>
                 
                );
              })}
            </ul>
    </>
  </SheetContent>
</Sheet>

</SignedIn>
<SignedOut>
    <Button asChild className="button bg-purple-gradient bg-cover">
        <Link href="/sign-in">
            Login
        </Link>
    </Button>
</SignedOut>
</nav>
    </header>
  )
}

export default MobileNav