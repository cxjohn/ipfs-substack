import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Summerform({ editorState, onEditorStateChange }) {
  return (
    <>
      <Editor
        editorState={editorState}
        editorClassName="!min-h-[400px] border-b"
        toolbarClassName="!border-t-0 !border-l-0 !border-r-0"
        toolbar={{
          fontFamily: { options: [], className: "hidden" },
          inline: { options: ["bold", "italic"] },
          list: { inDropdown: true },
          embedded: { className: "!hidden" },
          textAlign: { inDropdown: true },
        }}
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
}
