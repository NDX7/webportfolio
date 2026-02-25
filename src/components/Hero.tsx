"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, Shield, Terminal as TerminalIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Terminal = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="font-mono text-muted">
            {displayText}
            <span className="animate-pulse">_</span>
        </span>
    );
};

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex items-center gap-3 text-muted tracking-widest text-xs uppercase mb-6 font-bold font-mono">
                    <TerminalIcon className="w-4 h-4" />
                    <Terminal text="Permission: root@ndx7" />
                </div>

                <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
                    Nidhin <br />
                    <span className="text-white/20">Xavier.</span>
                </h1>

                <div className="max-w-2xl mb-12">
                    <h2 className="text-xl md:text-2xl font-mono mb-6 text-white flex items-center gap-2">
                        <Shield className="w-6 h-6 text-white/40" />
                        Cybersecurity Enthusiast
                    </h2>
                    <p className="text-lg md:text-xl text-muted leading-relaxed">
                        Passionate about finding vulnerabilities in web applications,
                        active <span className="text-white border-b border-white/20">CTF player</span>,
                        and constantly exploring the deep layers of the cyber domain.
                    </p>
                </div>

                <div className="flex flex-wrap gap-10 items-center">
                    <Link
                        href="/projects"
                        className="group flex items-center gap-3 text-lg font-mono hover:text-white transition-colors border-l border-white/20 pl-6"
                    >
                        DISCOVER_WORKS
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex gap-8 text-muted/50">
                        <Link href="https://github.com/NDX7" target="_blank" className="hover:text-white transition-colors">
                            <Github className="w-6 h-6" />
                        </Link>
                        <Link href="mailto:hello@ndx7.com" className="hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
