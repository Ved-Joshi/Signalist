import React from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = () => {
    return (
        <header className={"sticky top-0 header"}>
            <div className={"container header-wrapper"}>
                <Link href = "/">
                    <Image src={"/assets/icons/logo.svg"} alt={"Signalist Logo"} width={140} height={32} className = "cursor-pointer h-8 w-auto"/>
                </Link>
                <nav className={"hidden sm:block"}>

                </nav>
                <NavItems/>
                <UserDropdown />
            </div>
        </header>
    )
}
export default Header
