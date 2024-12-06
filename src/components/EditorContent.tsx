import "./EditorComponent.scss";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";

export default ({ data }: { data: string }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: generateHTML(JSON.parse(data), [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Image,
      Dropcursor,
    ]),
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

  return <EditorContent editor={editor} />;
};
