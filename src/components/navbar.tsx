'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import "./navbar.scss";
import Image from "next/image";

function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <div className="icon">
                <Link href="/home">
                    <Image src='/logo-horizontal.png' alt="Stalse" height={70} width={200} style={{ objectFit: 'cover' }} />
                </Link>
            </div>
            <div className="all-links">
                <Link
                    href="/about"
                    className={`link ${pathname === '/about' ? 'active-link' : ''}`}
                >
                    About
                </Link>
                <Link
                    href="/home"
                    className={`link ${pathname === '/home' ? 'active-link' : ''}`}
                >
                    Home
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;