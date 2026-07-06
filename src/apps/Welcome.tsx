import { ExternalLink, BookOpen, GitBranch, FileText } from 'lucide-react';

export default function WelcomeApp() {
    return (
        <div className="h-full bg-deer-bg text-deer-primary overflow-auto">

            <div className="w-full">
                <img
                    src="/deeros-banner.png"
                    alt="deeros banner"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="p-5 pb-0">
                <h1 className="text-3xl font-semibold text-moss">welcome to DeerOs</h1>
                <p className="text-sm text-deer-secondary">a simple lowcortisol os made in react</p>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h2 className="text-lg font-medium mb-3">getting started</h2>
                    <div className="grid gap-3">

                        <a
                            href="https://github.com/RichardD242/deeros"
                            target="_blank"
                            className="flex items-center justify-between rounded-deer-xl bg-deer-surface border border-deer-border p-4 hover:border-moss hover:bg-moss-hover/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <GitBranch size={20} className="text-moss" />
                                <span>github</span>
                            </div>
                            <ExternalLink size={16} className="text-deer-secondary" />
                        </a>

                        <a
                            href="/manual"
                            target="_blank"
                            className="flex items-center justify-between rounded-deer-xl bg-deer-surface border border-deer-border p-4 hover:border-moss hover:bg-moss-hover/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen size={20} className="text-moss" />
                                <span>manual and how to use</span>
                            </div>
                            <ExternalLink size={16} className="text-deer-secondary" />
                        </a>

                        <a
                            href="/docs"
                            target="_blank"
                            className="flex items-center justify-between rounded-deer-xl bg-deer-surface border border-deer-border p-4 hover:border-moss hover:bg-moss-hover/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-moss" />
                                <span>docs</span>
                            </div>
                            <ExternalLink size={16} className="text-deer-secondary" />
                        </a>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-3">about</h2>
                    <p className="text-sm text-deer-secondary">
                        DeerOs is a simple low cortisol OS made in react. It is designed to minimal and simple to dont spike cortisol levels.
                    </p>
                </div>
            </div>
        </div>
    );
}