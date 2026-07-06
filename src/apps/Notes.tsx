import { useState } from 'react';

const NOTES_KEY = 'deeros_notes';

export default function NotesApp() {
  const [text, setText] = useState(() => localStorage.getItem(NOTES_KEY) ?? '');

  const handleChange = (value: string) => {
    setText(value);
    localStorage.setItem(NOTES_KEY, value);
  };

  return (
    <textarea
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="write something..."
      className="w-full h-full resize-none outline-none bg-transparent text-deer-primary text-sm p-3"
    />
  );
}
