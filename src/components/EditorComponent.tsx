import "./EditorComponent.scss";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHighlighter,
  LuImagePlus,
  LuItalic,
  LuStrikethrough,
} from "react-icons/lu";
import { Editor } from "@tiptap/react";
import { IoTextOutline } from "react-icons/io5";
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  return (
    <div className="control-group">
      <div className="button-group"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }`}
      >
        <LuHeading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        <LuHeading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
      >
        <LuHeading3 />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("paragraph") ? "is-active" : ""
        }`}
      >
        <IoTextOutline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        <LuBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        <LuItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
      >
        <LuStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive("highlight") ? "is-active" : ""
        }`}
      >
        <LuHighlighter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive({ textAlign: "left" }) ? "is-active" : ""
        }`}
      >
        <LuAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive({ textAlign: "center" }) ? "is-active" : ""
        }`}
      >
        <LuAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive({ textAlign: "right" }) ? "is-active" : ""
        }`}
      >
        <LuAlignRight />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700 ${
          editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
        }`}
      >
        <LuAlignJustify />
      </button>
      <button
        className={`bg-blue-500 dark:bg-blue-900 text-white p-2 rounded border border-blue-700`}
        onClick={addImage}
      >
        <LuImagePlus />
      </button>
    </div>
  );
};

export default () => {
  const editor = useEditor({
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      document
        .getElementById("data")
        ?.setAttribute("data-json", JSON.stringify(editor.getJSON()));
    },
    autofocus: "end",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none dark:text-white",
      },
      transformPastedText(text) {
        return text.toUpperCase();
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image,
      Dropcursor,
    ],
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-800 p-4 shadow-md z-10 flex justify-center">
        <MenuBar editor={editor} />
      </div>
      <div className="h-min-[30vh]  p-4 border border-dashed border-gray-300 dark:border-gray-600  ">
        <EditorContent editor={editor} />
      </div>
      <span className="hidden " id="data"></span>
    </>
  );
};
