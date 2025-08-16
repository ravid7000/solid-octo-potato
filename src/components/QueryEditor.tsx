import Editor from "@monaco-editor/react";
import {
  MdKeyboardCommandKey,
  MdOutlineKeyboardReturn,
  MdAdd,
} from "react-icons/md";
import { FaMagic } from "react-icons/fa";

import Button from "./Button";

type QueryEditorProps = {
  value: string;
  onValueChange: (value: string | undefined) => void;
  onRunClick: () => void;
};

function QueryEditor({ value, onValueChange, onRunClick }: QueryEditorProps) {
  return (
    <div className="w-full border-2 border-[#204E82] pr-2 py-5 rounded-lg bg-white">
      <Editor
        height="100px"
        language="sql"
        options={{
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
          fontSize: 18,
          renderLineHighlight: "none",
          guides: {
            indentation: false,
          },
        }}
        value={value}
        onChange={onValueChange}
      />
      <div className="flex gap-2 pt-2 pl-6 pr-4">
        <Button title="Generate Sample Query" asIcon>
          <FaMagic />
        </Button>
        <div className="mr-auto" />
        <Button title="Format Query">Format SQL</Button>
        <Button color="primary" title="Run Query" onClick={onRunClick}>
          <MdKeyboardCommandKey />
          <MdAdd />
          <MdOutlineKeyboardReturn />
        </Button>
      </div>
    </div>
  );
}

export default QueryEditor;
