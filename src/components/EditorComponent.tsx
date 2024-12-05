import "./EditorComponent.css";

import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});
const EditorComponent = () => {
  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
        </tr>
      </tbody>
    </table>
  `;

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      // Default TableCell
      // TableCell,
      // Custom TableCell with backgroundColor attribute
      CustomTableCell,
    ],
    content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/600x400" />
      <img src="https://placehold.co/800x400" />
    `,
  });
  const MenuBar = ({ editor }: { editor: any }) => {
    // if (!editor) {
    //   return null;
    // }

    return (
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: true,
                  withHeaderColumn: true,
                  cellContent: (row: number, col: number) =>
                    `Cell ${row + 1}-${col + 1}`,
                })
                .run()
            }
          >
            Insert table
          </button>
          <button
          // onClick={() =>
          //   editor
          //     .chain()
          //     .focus()
          //     .insertContent(tableHTML, {
          //       parseOptions: {
          //         preserveWhitespace: false,
          //       },
          //     })
          //     .run()
          // }
          >
            Insert HTML table
          </button>
          <button
          // onClick={() => editor.chain().focus().addColumnBefore().run()}
          // disabled={!editor.can().addColumnBefore()}
          >
            Add column before
          </button>
          <button
          // onClick={() => editor.chain().focus().addColumnAfter().run()}
          // disabled={!editor.can().addColumnAfter()}
          >
            Add column after
          </button>
          <button
          // onClick={() => editor.chain().focus().deleteColumn().run()}
          // disabled={!editor.can().deleteColumn()}
          >
            Delete column
          </button>
          <button
          // onClick={() => editor.chain().focus().addRowBefore().run()}
          // disabled={!editor.can().addRowBefore()}
          >
            Add row before
          </button>
          <button
          // onClick={() => editor.chain().focus().addRowAfter().run()}
          // disabled={!editor.can().addRowAfter()}
          >
            Add row after
          </button>
          <button
          // onClick={() => editor.chain().focus().deleteRow().run()}
          // disabled={!editor.can().deleteRow()}
          >
            Delete row
          </button>
          <button
          // onClick={() => editor.chain().focus().deleteTable().run()}
          // disabled={!editor.can().deleteTable()}
          >
            Delete table
          </button>
          <button
          // onClick={() => editor.chain().focus().mergeCells().run()}
          // disabled={!editor.can().mergeCells()}
          >
            Merge cells
          </button>
          <button
          // onClick={() => editor.chain().focus().splitCell().run()}
          // disabled={!editor.can().splitCell()}
          >
            Split cell
          </button>
          <button
          // onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          // disabled={!editor.can().toggleHeaderColumn()}
          >
            ToggleHeaderColumn
          </button>
          <button
          // onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          // disabled={!editor.can().toggleHeaderRow()}
          >
            Toggle header row
          </button>
          <button
          // onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          // disabled={!editor.can().toggleHeaderCell()}
          >
            Toggle header cell
          </button>
          <button
          // onClick={() => editor.chain().focus().mergeOrSplit().run()}
          // disabled={!editor.can().mergeOrSplit()}
          >
            Merge or split
          </button>
          <button
          // onClick={() =>
          //   editor
          //     .chain()
          //     .focus()
          //     .setCellAttribute("backgroundColor", "#FAF594")
          //     .run()
          // }
          >
            Set cell attribute
          </button>
          <button
          // onClick={() => editor.chain().focus().fixTables().run()}
          // disabled={!editor.can().fixTables()}
          >
            Fix tables
          </button>
          <button
          // onClick={() => editor.chain().focus().goToNextCell().run()}
          // disabled={!editor.can().goToNextCell()}
          >
            Go to next cell
          </button>
          <button
          // onClick={() => editor.chain().focus().goToPreviousCell().run()}
          // disabled={!editor.can().goToPreviousCell()}
          >
            Go to previous cell
          </button>
        </div>
      </div>
    );
  };

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button onClick={addImage}>Add image from URL</button>
        </div>
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default EditorComponent;
