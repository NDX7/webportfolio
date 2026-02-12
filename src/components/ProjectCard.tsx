"use client";

import { motion } from 'framer-motion';
import { Github, Star, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { GithubRepo } from '@/lib/github';

export default function ProjectCard({ repo, index }: { repo: GithubRepo, index: number }) {
    return (
        <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-10 rounded-none border-l-2 border-white/10 hover:border-white transition-all group flex flex-col justify-between h-full bg-black/40 backdrop-blur-sm"
        >
            <div>
                <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                        <ShieldAlert className="w-4 h-4" />
                        <span>ID: 0x{repo.id.toString(16).slice(0, 4)}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase font-mono">{repo.name}</h3>
                <p className="text-muted text-base leading-relaxed line-clamp-3 mb-6">
                    {repo.description || "Security research project focusing on vulnerability patterns and system architecture."}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">{repo.language || 'DATA'}</span>
                    <div className="flex items-center gap-1.5 text-white/40 font-mono text-xs">
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stargazers_count}</span>
                    </div>
                </div>

                <Github className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
            </div>
        </motion.a>
    );
}
