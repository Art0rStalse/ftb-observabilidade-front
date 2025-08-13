'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import "./navbar.scss";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {handleSignOut} from "@/actions/auth";

function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

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
            <div>
                <span className="logged-session-text">Ola, {session?.user?.name}</span>
                <button
                    className="logout-button"
                    onClick={handleSignOut}>Sair</button>
            </div>
        </nav>
    );
}

export default Navbar;