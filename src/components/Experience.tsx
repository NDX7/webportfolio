"use client";

import { motion } from 'framer-motion';
import { Target, Bug, Sword, Search } from 'lucide-react';

const experience = [
    {
        title: "Web Vulnerability Research",
        icon: Bug,
        description: "Deep-dive analysis into modern web architectures. Identifying XSS, SQLi, and logic flaws in emerging technologies.",
        points: ["Manual Code Review", "Automated Fuzzing", "Architecture Auditing"]
    },
    {
        title: "CTF Competitions",
        icon: Sword,
        description: "Active involvement in global CTF events. Specializing in Web Exploitation and Reverse Engineering challenges.",
        points: ["Hack The Box", "TryHackMe", "Global Ranking Focus"]
    }
];

export default function Experience() {
    return (
        <section className="py-32 px-6 max-w-5xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold tracking-tight font-mono">
                        Experience<span className="text-white/20">.log</span>
                    </h2>
                    <p className="text-muted text-lg max-w-md">
                        Continuously hunting for security flaws and honing exploitation techniques in controlled environments.
                    </p>
                </div>

                <div className="space-y-12">
                    {experience.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-6 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 glass rounded-2xl group-hover:bg-white/5 transition-colors">
                                    <item.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                            </div>
                            <p className="text-muted leading-relaxed">
                                {item.description}
                            </p>
                            <ul className="flex flex-wrap gap-3">
                                {item.points.map((point) => (
                                    <li key={point} className="px-3 py-1 glass text-xs font-mono text-muted/80 rounded-full">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
