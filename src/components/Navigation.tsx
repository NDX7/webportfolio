"use strict";
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        { name: 'INDEX', path: '/' },
        { name: 'ARCHIVE', path: '/projects' },
        { name: 'ACHIEVEMENTS', path: '/achievements' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-8">
            <div className="glass px-8 py-3 rounded-none border border-white/10 flex gap-10 items-center bg-black/60 backdrop-blur-md">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`text-xs font-mono tracking-widest transition-colors hover:text-white ${pathname === link.path ? 'text-white' : 'text-white/40'
                            }`}
                    >
                        {link.name}
                        {pathname === link.path && (
                            <motion.div
                                layoutId="nav-underline"
                                className="h-px bg-white mt-1"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
