'use client'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { navLinks } from "../../../constants"
import { usePathname } from "next/navigation"
  

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
                  className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
    </>
  </SheetContent>
</Sheet>

</SignedIn>
</nav>
    </header>
  )
}

export default MobileNav