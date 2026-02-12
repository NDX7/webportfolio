import ProjectCard from "@/components/ProjectCard";
import InteractiveBackground from "@/components/InteractiveBackground";
import { getTopRepos } from "@/lib/github";
import { Terminal } from "lucide-react";

export default async function ProjectsPage() {
    const repos = await getTopRepos('NDX7');

    return (
        <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <InteractiveBackground />

            <div className="mb-24 space-y-6">
                <div className="flex items-center gap-2 text-white/40 font-mono text-xs tracking-widest uppercase">
                    <Terminal className="w-4 h-4" />
                    <span>query_repos --user NDX7</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-mono">
                    Security <br />
                    <span className="text-white/20">Archive.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {repos.map((repo, index) => (
                    <ProjectCard key={repo.id} repo={repo} index={index} />
                ))}
                {repos.length === 0 && (
                    <div className="col-span-full py-20 text-center glass border border-dashed border-white/10">
                        <p className="text-muted font-mono uppercase tracking-widest text-xs">No entries found in archive.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
