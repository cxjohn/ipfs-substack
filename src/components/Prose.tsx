import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="!h-72"
          toolbarClassName="!border-t-0 !border-l-0 !border-r-0"
          toolbar={{
            fontFamily: { options: [], className: "hidden" },
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            history: { inDropdown: true },
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          className="h-72"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
