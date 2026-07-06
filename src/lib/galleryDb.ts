export type GalleryRecord = {
  id: number;
  name: string;
  blob: Blob;
  createdAt: number;
};

const DB_NAME = 'deeros_gallery';
const STORE_NAME = 'images';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllImages(): Promise<GalleryRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => resolve(request.result as GalleryRecord[]);
    request.onerror = () => reject(request.error);
  });
}

export async function getImage(id: number): Promise<GalleryRecord | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get(id);

    request.onsuccess = () => resolve(request.result as GalleryRecord | undefined);
    request.onerror = () => reject(request.error);
  });
}

export async function addImage(name: string, blob: Blob): Promise<GalleryRecord> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const record = { name, blob, createdAt: Date.now() };
    const request = tx.objectStore(STORE_NAME).add(record);

    request.onsuccess = () => resolve({ ...record, id: request.result as number });
    request.onerror = () => reject(request.error);
  });
}

export async function deleteImage(id: number): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const request = tx.objectStore(STORE_NAME).delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
