import { useState } from 'react';

export default function NotesApp() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="write something..."
      className="w-full h-full resize-none outline-none bg-transparent text-deer-primary text-sm p-3"
    />
  );
}
