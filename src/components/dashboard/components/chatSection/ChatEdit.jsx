// ChatEditor.tsx or ChatEdit.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Or 'quill.bubble.css' for a different theme

const ChatEdit = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Type your message...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      // Optional: Listen to content change
      quillInstanceRef.current.on('text-change', () => {
        const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML;
        console.log('Editor content:', html);
      });
    }
  }, []);

  return (
    <div className="chat-editor">
      <div ref={editorRef} style={{ height: '200px' }} />
    </div>
  );
};

export default ChatEdit;
