import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ImagePlus, Images, Loader2, Trash2, UploadCloud, X } from 'lucide-react';
import { addImage, deleteImage, getAllImages } from '../lib/galleryDb';
import { useWindows } from '../state/windowsStore';

type GalleryImage = {
    id: number;
    url: string;
    name: string;
    createdAt: number;
};

export default function GalleryApp() {
    const { openApp } = useWindows();
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [selected, setSelected] = useState<GalleryImage | null>(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dragCounter = useRef(0);
    const imagesRef = useRef<GalleryImage[]>([]);
    imagesRef.current = images;

    useEffect(() => {
        let cancelled = false;

        getAllImages().then((records) => {
            if (cancelled) return;

            const loaded = records
                .map((record) => ({
                    id: record.id,
                    url: URL.createObjectURL(record.blob),
                    name: record.name,
                    createdAt: record.createdAt,
                }))
                .sort((a, b) => b.createdAt - a.createdAt);

            setImages(loaded);
            setLoading(false);
        });

        return () => {
            cancelled = true;
            imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
        };
    }, []);

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;

        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

        for (const file of imageFiles) {
            const record = await addImage(file.name, file);
            const url = URL.createObjectURL(record.blob);

            setImages((prev) => [
                { id: record.id, url, name: record.name, createdAt: record.createdAt },
                ...prev,
            ]);
        }
    };

    const handleDelete = async (id: number) => {
        const target = images.find((img) => img.id === id);
        await deleteImage(id);

        setImages((prev) => prev.filter((img) => img.id !== id));
        if (target) URL.revokeObjectURL(target.url);

        setSelected((prev) => (prev?.id === id ? null : prev));
    };

    const selectedIndex = selected ? images.findIndex((img) => img.id === selected.id) : -1;

    const goToPrev = () => {
        if (selectedIndex > 0) setSelected(images[selectedIndex - 1]);
    };

    const goToNext = () => {
        if (selectedIndex !== -1 && selectedIndex < images.length - 1) setSelected(images[selectedIndex + 1]);
    };

    const openInNewWindow = () => {
        if (!selected) return;
        openApp('image', undefined, { id: selected.id });
        setSelected(null);
    };

    return (
        <div className="flex h-full flex-col bg-deer-surface text-deer-primary">
            <div className="flex items-center justify-between border-b border-deer-border px-5 py-4">
                <div className="flex items-center gap-2">
                    <Images size={20} className="text-moss" />
                    <h1 className="text-lg font-semibold">gallery</h1>
                </div>

                <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-2 rounded-deer-xl bg-moss px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-moss-hover active:scale-95"
                >
                    <ImagePlus size={16} />
                    add images
                </button>

                <input
                    ref={inputRef}
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            <div
                onDragEnter={(e) => {
                    e.preventDefault();
                    dragCounter.current += 1;
                    setDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    dragCounter.current -= 1;
                    if (dragCounter.current <= 0) setDragging(false);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    dragCounter.current = 0;
                    setDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
                className={`m-5 flex items-center justify-center gap-3 rounded-deer-xl border-2 border-dashed p-6 text-sm transition ${
                    dragging
                        ? 'border-moss bg-moss/10 text-moss'
                        : 'border-deer-border text-deer-secondary'
                }`}
            >
                <UploadCloud size={18} />
                drag and drop images here, or click "add images"
            </div>

            <div className="flex-1 overflow-auto px-5 pb-5">
                {loading ? (
                    <div className="flex h-full items-center justify-center gap-2 text-deer-secondary">
                        <Loader2 size={18} className="animate-spin" />
                        loading gallery...
                    </div>
                ) : images.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-2 text-deer-secondary">
                        <Images size={32} className="opacity-40" />
                        no images yet
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {images.map((img) => (
                            <button
                                key={img.id}
                                onClick={() => setSelected(img)}
                                className="group relative aspect-square overflow-hidden rounded-deer-xl border border-deer-border bg-deer-bg"
                            >
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                                    <span className="truncate p-3 text-xs font-medium text-white">
                                        {img.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selected && (
                <div
                    onClick={() => setSelected(null)}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-h-full max-w-full flex-col overflow-hidden rounded-deer-xl bg-deer-surface shadow-2xl"
                    >
                        <div className="flex items-center justify-between gap-2 border-b border-deer-border px-3 py-2">
                            <button
                                onClick={goToPrev}
                                disabled={selectedIndex <= 0}
                                className="rounded-lg p-2 text-deer-secondary transition hover:bg-deer-border hover:text-deer-primary disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <span className="truncate text-sm font-medium text-deer-primary">
                                {selected.name}
                            </span>

                            <div className="flex shrink-0 items-center gap-1">
                                <button
                                    onClick={goToNext}
                                    disabled={selectedIndex === -1 || selectedIndex >= images.length - 1}
                                    className="rounded-lg p-2 text-deer-secondary transition hover:bg-deer-border hover:text-deer-primary disabled:opacity-30 disabled:hover:bg-transparent"
                                >
                                    <ChevronRight size={18} />
                                </button>

                                <button
                                    onClick={openInNewWindow}
                                    className="rounded-lg p-2 text-deer-secondary transition hover:bg-deer-border hover:text-deer-primary"
                                >
                                    <ExternalLink size={18} />
                                </button>

                                <button
                                    onClick={() => handleDelete(selected.id)}
                                    className="rounded-lg p-2 text-deer-secondary transition hover:bg-deer-border hover:text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <button
                                    onClick={() => setSelected(null)}
                                    className="rounded-lg p-2 text-deer-secondary transition hover:bg-deer-border"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <img
                            src={selected.url}
                            alt={selected.name}
                            className="max-h-[70vh] max-w-[80vw] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
