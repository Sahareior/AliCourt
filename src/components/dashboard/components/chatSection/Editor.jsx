import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEdited, updatedMessage } from '../../../../redux/Slices/userSlice';




function htmlToMessages(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = Array.from(doc.querySelectorAll('p'));

  return paragraphs.map((p, index) => {
    const color = p.style.color;
    const sent_by = color === 'red' ? 'user' : 'bot';
    const message_content = p.innerHTML.replace(/<br\s*\/?>/gi, '\n');

    return {
      id: Date.now() + index, // or preserve IDs another way
      sent_by,
      message_content,
      model_name: 'Chartwright',
      timestamp: new Date().toISOString()
    };
  });
}


const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2  flex-wrap border-b pb-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-black text-white' : ''}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-black text-white' : ''}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-black text-white' : ''}`}
      >
        Underline
      </button>
      <select
        onChange={(e) =>
          editor.chain().focus().toggleHeading({ level: parseInt(e.target.value) }).run()
        }
        defaultValue=""
        className="px-2 py-1 border rounded"
      >
        <option value="">Paragraph</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
      </select>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 border rounded"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 border rounded"
      >
        Redo
      </button>
    </div>
  );
};

const Editor = ({messages,id,chat}) => {

  console.log('cga',chat)

const dispatch = useDispatch()
  
const generateHTML = (messages) => {
  return messages
    .map((msg) => {
      const color = msg.sent_by === 'user' ? 'red' : 'green';
      return `<p style="color: ${color};">${msg.message_content.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
};
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Heading],
    content: generateHTML(messages),
     onUpdate({ editor }) {
    const html = editor.getHTML();
    // dispatch(updatedMessage(chat,messages))
    console.log('Updated HTML:', html);
  },
  });

  return (
    <div className="max-w-full mx-auto mt-6 p-4  rounded shadow bg-white">
      <MenuBar editor={editor} />
      <EditorContent
      
        editor={editor}
        className="prose ProseMirror max-w- border-none  rounded p-4"
      />
      <button
  onClick={() => {
    const html = editor?.getHTML();
    const jsonMessages = htmlToMessages(html);
    dispatch(addEdited({chat:chat,jsonMessages}))
    console.log('JSON Output:', jsonMessages);
  }}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
>
  Save
</button>

    </div>
  );
};

export default Editor;
