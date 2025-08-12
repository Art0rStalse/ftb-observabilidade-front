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
                <Link href="/">
                    <Image src='/logo-horizontal.png' alt="Stalse" height={70} width={200} style={{ objectFit: 'cover' }} />
                </Link>
            </div>
            <div className="all-links">
                <Link
                    href="/schema"
                    className={`link ${pathname === '/schema' ? 'active-link' : ''}`}

                >
                    Mudanças no Schema
                </Link>
                <Link
                    href="/synchronizations"
                    className={`link ${pathname === '/synchronizations' ? 'active-link' : ''}`}
                >
                    Sincronizações
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;