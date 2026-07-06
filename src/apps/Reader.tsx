import { useRef, useState } from 'react';
import { BookOpen, Loader2, Minus, Plus } from 'lucide-react';

const COLORS = [
    { name: 'moss', className: 'text-moss' },
    { name: 'oak', className: 'text-oak' },
    { name: 'olive', className: 'text-olive' },
    { name: 'primary', className: 'text-deer-primary' },
    { name: 'secondary', className: 'text-deer-secondary' },
];

function normalizeUrl(value: string) {
    const trimmed = value.trim();
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

function parseArticle(raw: string) {
    const titleMatch = raw.match(/^Title:\s*(.+)$/m);
    const markdownIndex = raw.indexOf('Markdown Content:');
    const content = markdownIndex !== -1 ? raw.slice(markdownIndex + 'Markdown Content:'.length) : raw;
    return {
        title: titleMatch ? titleMatch[1].trim() : '',
        content: content.trim(),
    };
}

export default function ReaderApp() {
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fontSize, setFontSize] = useState(18);
    const [color, setColor] = useState(COLORS[3]);
    const requestId = useRef(0);

    async function loadArticle() {
        const trimmed = input.trim();
        if (!trimmed) return;

        const id = ++requestId.current;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://r.jina.ai/${normalizeUrl(trimmed)}`);
            if (!res.ok) throw new Error('failed');
            const raw = await res.text();
            const article = parseArticle(raw);
            if (requestId.current !== id) return;
            setTitle(article.title);
            setContent(article.content);
        } catch {
            if (requestId.current !== id) return;
            setError("couldnt load that page try a different url");
            setTitle('');
            setContent('');
        } finally {
            if (requestId.current === id) setLoading(false);
        }
    }

    return (
        <div className="flex h-full flex-col bg-deer-surface text-deer-primary">

            <div className="flex flex-wrap items-center gap-2 border-b border-deer-border p-3">
                <BookOpen size={18} className="text-deer-secondary" />

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') loadArticle();
                    }}
                    placeholder="paste a url"
                    className="min-w-40 flex-1 rounded-xl bg-deer-bg px-3 py-2 text-sm outline-none"
                />

                <button
                    onClick={loadArticle}
                    className="rounded-xl bg-moss px-4 py-2 text-sm text-white hover:bg-moss-hover transition"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : 'read'}
                </button>

                <div className="flex items-center gap-1 rounded-xl bg-deer-bg px-2 py-1">
                    <button
                        onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                        className="rounded-lg p-1.5 hover:bg-deer-border transition"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-xs text-deer-secondary">{fontSize}</span>
                    <button
                        onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                        className="rounded-lg p-1.5 hover:bg-deer-border transition"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-deer-bg px-2 py-1.5">
                    {COLORS.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => setColor(c)}
                            className={`h-5 w-5 rounded-full border-2 transition ${c.className} ${
                                color.name === c.name ? 'border-deer-primary' : 'border-transparent'
                            }`}
                        >
                            <span className="block h-full w-full rounded-full bg-current" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {error && <p className="text-sm text-deer-secondary">{error}</p>}

                {!error && content && (
                    <article className={color.className} style={{ fontSize }}>
                        {title && <h1 className="mb-4 font-semibold" style={{ fontSize: fontSize * 1.5 }}>{title}</h1>}
                        {content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="mb-4 whitespace-pre-wrap leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </article>
                )}

                {!error && !content && !loading && (
                    <p className="text-sm text-deer-secondary">paste a url above to read it here</p>
                )}
            </div>
        </div>
    );
}
