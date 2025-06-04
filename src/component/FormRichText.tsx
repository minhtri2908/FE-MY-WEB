import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  error?: string;
  placeholder?: string;
}

const FormRichText: React.FC<Props> = ({
  label,
  value,
  onChange,
  error,
  name,
}) => {
  const [linkInputVisible, setLinkInputVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkPopupPosition, setLinkPopupPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const linkInputRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline, // gạch chân chữ
      //gắn link
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor?.getHTML() || "";
      onChange({ target: { name, value: html } });
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        linkInputRef.current &&
        !linkInputRef.current.contains(e.target as Node)
      ) {
        setLinkInputVisible(false);
      }
    };

    if (linkInputVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [linkInputVisible]);
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();

        const { from, to } = editor.state.selection;
        const linkMark = editor.state.doc.rangeHasMark(
          from,
          to,
          editor.schema.marks.link
        );
        console.log(linkMark);
        if (linkMark) {
          editor.chain().focus().insertContentAt(to, " ").run();
        } else {
          // Nếu không phải vùng link, chèn space bình thường
          editor.chain().focus().insertContent(" ").run();
        }
      }
    };

    editor.view.dom.addEventListener("keydown", handleKeyDown);
    return () => {
      editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative w-full mt-6">
      {/* Toolbar */}
      <div className="flex gap-2 border border-gray-300 p-2 rounded-t-md bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getBtnStyle(editor.isActive("bold"))}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getBtnStyle(editor.isActive("italic"))}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getBtnStyle(editor.isActive("underline"))}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href || "";
            setLinkUrl(previousUrl);
            const coords = editor.view.coordsAtPos(editor.state.selection.from);
            setLinkPopupPosition({ left: coords.left, top: coords.top + 25 });
            setLinkInputVisible(true);
          }}
          className={getBtnStyle(editor.isActive("link"))}
        >
          Link
        </button>
      </div>

      {/* Content */}
      <div
        className={`border border-t-0 ${
          error ? "border-red-500" : "border-gray-400"
        } rounded-b-md bg-[#f2f2f2]`}
      >
        <div className="h-[140px] max-h-[300px] overflow-y-auto flex flex-col">
          <EditorContent
            editor={editor}
            className="    
            flex-1         
            text-left p-4 cursor-text         
            [&_.ProseMirror]:h-full        
            [&_.ProseMirror]:w-full        
            [&_.ProseMirror]:min-h-full
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:cursor-text
            [&_.ProseMirror]:focus:outline-none
            [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a:hover]:text-blue-800

"
          />
          {linkInputVisible && linkPopupPosition && (
            <div
              ref={linkInputRef}
              className="fixed z-50 bg-white border rounded shadow p-2"
              style={{
                left: linkPopupPosition.left,
                top: linkPopupPosition.top,
              }}
            >
              <input
                type="text"
                placeholder="Dán hoặc nhập URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="border px-2 py-1 rounded text-sm w-60"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange("link")
                      .setLink({ href: linkUrl })
                      .run();
                    setLinkInputVisible(false);
                    setLinkUrl("");
                  }}
                  className="text-sm px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  OK
                </button>
                <button
                  onClick={() => {
                    setLinkInputVisible(false);
                    setLinkUrl("");
                  }}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Label giống FormInput */}
      <label className="absolute left-3 -top-3 bg-[#f2f2f2] px-1 text-sm text-gray-500 peer-focus:text-black">
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const getBtnStyle = (active: boolean) =>
  `text-sm px-2 py-1 rounded border ${
    active ? "bg-black text-white" : "bg-white text-black"
  } hover:bg-gray-200`;

export default FormRichText;
