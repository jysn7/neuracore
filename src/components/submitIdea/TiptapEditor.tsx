// src/components/Tiptap.tsx
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./Menu-bar";

interface TiptapProps {
  content?: string;
  onChange?: (value: string) => void;
}

type AIType = "continue" | "shorten" | "rewrite";

const Tiptap: React.FC<TiptapProps> = ({ content = "", onChange }) => {
  const [initialContent] = useState<string>(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-3" } },
      }),
      Highlight.configure({ HTMLAttributes: { class: "hover:bg-green-500" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "editor w-full min-h-60 bg-bg-dark border border-border-secondary rounded-lg p-4 focus-within:ring-2 focus-within:ring-brand-primary transition-all",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[156px] border rounded-md bg-slate-50 py-2 px-3">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
