"use client";

import { motion } from 'framer-motion';

const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma"] },
    { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel"] },
];

export default function Skills() {
    return (
        <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
            <h2 className="text-3xl font-bold mb-12 tracking-tight">Technical <span className="text-muted">Skills.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill.category}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <h3 className="text-sm uppercase tracking-widest text-muted font-bold mb-6">{skill.category}</h3>
                        <ul className="space-y-4">
                            {skill.items.map((item) => (
                                <li key={item} className="text-lg font-medium hover:text-white transition-colors cursor-default">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
