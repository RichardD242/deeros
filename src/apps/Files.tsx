import { apps } from "./registry";
import { FileCode2, Search } from "lucide-react";



export default function FilesApp() {
    return (
        <div className="flex h-full flex-col bg-deer-surface text-deer-primary">
            <div className="border-b border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2">
                    <Search size={18} className="opacity-60" />
                    <input
                        placeholder="search files..."
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-deer-primary/50"
                    />
                </div>
            </div>

            <div className="flex flex-col p-3">
                {apps.map((file) => (
                    <button
                        key={file.id}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/10"
                    >
                        <div className="rounded-lg bg-sand p-2 text-deer-primary">
                            <FileCode2 size={22}/>
                        </div>

                        <span>{file.name}</span>

                    </button>
                ))}
            </div>
        </div>
    );
}