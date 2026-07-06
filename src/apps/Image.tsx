import { useEffect, useState } from 'react';
import { getImage } from '../lib/galleryDb';

type ImageAppProps = {
    data?: unknown;
};

export default function ImageApp({ data }: ImageAppProps) {
    const imageId = (data as { id?: number } | undefined)?.id;
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (imageId === undefined) return;

        let objectUrl: string | null = null;
        let cancelled = false;

        getImage(imageId).then((record) => {
            if (cancelled || !record) return;
            objectUrl = URL.createObjectURL(record.blob);
            setUrl(objectUrl);
        });

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [imageId]);

    return (
        <div className="flex h-full w-full items-center justify-center bg-black">
            {url && <img src={url} alt="" className="h-full w-full object-contain" />}
        </div>
    );
}
