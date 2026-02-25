import { getRepoContents } from "@/lib/github";
import InteractiveBackground from "@/components/InteractiveBackground";
import { Folder, Shield, ExternalLink, Terminal, ChevronRight, Image as ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

export default async function AchievementsPage() {
    const contents = await getRepoContents('NDX7', 'CTF_journal', 'Certificates');

    const certificates = contents.filter(item =>
        item.type === 'file' &&
        (item.name.toLowerCase().endsWith('.png') ||
            item.name.toLowerCase().endsWith('.jpg') ||
            item.name.toLowerCase().endsWith('.jpeg') ||
            item.name.toLowerCase().endsWith('.pdf'))
    );

    return (
        <main className="relative min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <InteractiveBackground />

            <div className="mb-16 space-y-6">
                <div className="flex items-center gap-2 text-white/40 font-mono text-xs tracking-widest uppercase">
                    <Terminal className="w-4 h-4" />
                    <span>system_call --exec get_achievements</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-mono">
                    Deep <br />
                    <span className="text-white/20">Archive.</span>
                </h2>
            </div>

            {/* Directory Interface */}
            <div className="glass rounded-none border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden">
                {/* Header/Path */}
                <div className="border-b border-white/10 p-4 flex items-center gap-4 bg-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/40 ml-4">
                        <Folder className="w-3 h-3" />
                        <span>root</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white">achievements</span>
                    </div>
                </div>

                {/* Directory Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
                    {/* Sidebar */}
                    <div className="border-r border-white/10 p-6 space-y-8 bg-black/20">
                        <div>
                            <h3 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-4">Directories</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-white text-xs font-mono p-2 bg-white/5 border-l-2 border-white">
                                    <Folder className="w-4 h-4 text-blue-400" />
                                    Certificates
                                </div>
                                <div className="flex items-center gap-3 text-white/40 text-xs font-mono p-2 hover:bg-white/5 transition-colors cursor-not-allowed">
                                    <Folder className="w-4 h-4" />
                                    CTF_Reports
                                </div>
                                <div className="flex items-center gap-3 text-white/40 text-xs font-mono p-2 hover:bg-white/5 transition-colors cursor-not-allowed">
                                    <Folder className="w-4 h-4" />
                                    Badges
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-4">System Stats</h3>
                            <div className="space-y-3 text-[10px] font-mono text-white/40">
                                <div className="flex justify-between">
                                    <span>Verified Entires</span>
                                    <span className="text-white">{certificates.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Encryption</span>
                                    <span className="text-white">AES-256</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Access</span>
                                    <span className="text-green-500">GRTED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main File List */}
                    <div className="lg:col-span-3">
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest bg-white/5">
                                        <th className="px-6 py-4 font-normal">Name</th>
                                        <th className="px-6 py-4 font-normal">Type</th>
                                        <th className="px-6 py-4 font-normal">Size</th>
                                        <th className="px-6 py-4 font-normal text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs font-mono">
                                    {certificates.map((cert) => {
                                        const extension = cert.name.split('.').pop();
                                        const isImage = cert.name.toLowerCase().match(/\.(png|jpg|jpeg)$/);

                                        return (
                                            <tr key={cert.sha} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {isImage ? (
                                                            <ImageIcon className="w-4 h-4 text-purple-400" />
                                                        ) : (
                                                            <FileText className="w-4 h-4 text-orange-400" />
                                                        )}
                                                        <span className="text-white group-hover:translate-x-1 transition-transform inline-block">
                                                            {cert.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-white/40 uppercase font-bold">{extension}</td>
                                                <td className="px-6 py-4 text-white/40">{(cert.size / 1024).toFixed(1)} KB</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={cert.html_url}
                                                        target="_blank"
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 glass hover:bg-white/10 text-white/60 hover:text-white transition-all text-[10px] uppercase"
                                                    >
                                                        View <ExternalLink className="w-3 h-3" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {certificates.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center text-white/20 italic">
                                                No files found in directory.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Grid Preview */}
            <div className="mt-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Visual Preview</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {certificates.map((cert) => {
                        const isImage = cert.name.toLowerCase().match(/\.(png|jpg|jpeg)$/);
                        if (!isImage) return null;

                        return (
                            <Link
                                key={cert.sha}
                                href={cert.html_url}
                                target="_blank"
                                className="group relative aspect-square glass overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                            >
                                <img
                                    src={cert.download_url}
                                    alt={cert.name}
                                    className="object-cover w-full h-full opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <span className="text-[8px] font-mono text-white truncate w-full">
                                        {cert.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
