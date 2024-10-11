import React from "react";
import Editor from "@monaco-editor/react";

export const MonacoEditorWithReadOnlySection = ({
  code,
  handleCodeChange,
  language,
}: {
  language: string;
  code: string;
  handleCodeChange: (newCode: string) => void;
}) => {
  const editorOptions = {
    readOnly: false, // The overall editor is editable
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Find the start and end lines of the readonly region
    const model = editor.getModel();
    let startLine = -1;
    let endLine = -1;

    for (let i = 1; i <= model.getLineCount(); i++) {
      const lineContent = model.getLineContent(i);
      if (lineContent.includes("//#region readonly")) {
        startLine = i;
      } else if (lineContent.includes("//#endregion readonly")) {
        endLine = i;
      }
    }

    if (startLine !== -1 && endLine !== -1) {
      // Create and store the decorations collection
      const readOnlyDecoration = {
        range: new monaco.Range(startLine, 1, endLine, 1),
        options: {
          inlineClassName: "readonly-code",
          isWholeLine: true,
          readOnly: true,
        },
      };

      // Store the decorations collection if you need to modify it later
      editor.readOnlyDecorations = editor.createDecorationsCollection([
        readOnlyDecoration,
      ]);

      // You can later update or remove decorations using the stored collection:
      // editor.readOnlyDecorations.clear(); // to remove
      // editor.readOnlyDecorations.set([newDecoration]); // to update
    }
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      // @ts-ignore
      onChange={handleCodeChange}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={editorOptions}
    />
  );
};
