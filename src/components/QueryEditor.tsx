import Editor, { type OnMount } from "@monaco-editor/react";
import {
  MdKeyboardCommandKey,
  MdKeyboardControlKey,
  MdOutlineKeyboardReturn,
  MdAdd,
} from "react-icons/md";
import { FaMagic } from "react-icons/fa";

import Button from "./Button";
import { useMemo } from "react";

type QueryEditorProps = {
  value: string;
  isRunning?: boolean;
  onValueChange: (value: string | undefined) => void;
  onRunClick: () => void;
  onMagicClick: () => void;
  onFormatClick: () => void;
};

function QueryEditor({
  value,
  isRunning,
  onValueChange,
  onRunClick,
  onMagicClick,
  onFormatClick,
}: QueryEditorProps) {
  const isMac = useMemo(() => {
    return navigator.platform.toUpperCase().includes("MAC");
  }, []);

  const metaIcon = isMac ? <MdKeyboardCommandKey /> : <MdKeyboardControlKey />;

  const metaKey = isMac ? "Cmd" : "Ctrl";

  const handleEditorMount: OnMount = (editor, monaco) => {
    // Ctrl + Enter on Win/Linux, Cmd + Enter on Mac
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      console.log("running...");
      onRunClick();
    });

    // Ctrl + Enter on Win/Linux, Cmd + k on Mac
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      console.log("formatting...");
      onFormatClick();
    });

    editor.addAction({
      id: "run-sql",
      label: "Run SQL",
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: function () {
        onRunClick();
      },
    });

    editor.addAction({
      id: "format-sql",
      label: "Format SQL",
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
      run: function () {
        onFormatClick();
      },
    });
  };

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
          fontSize: 13,
          renderLineHighlight: "none",
          stickyTabStops: false,
          stickyScroll: {
            enabled: false,
          },
        }}
        value={value}
        onChange={onValueChange}
        onMount={handleEditorMount}
      />
      <div className="flex gap-2 pt-2 pl-6 pr-4">
        <Button title="Generate Sample Query" asIcon onClick={onMagicClick}>
          <FaMagic />
        </Button>
        <div className="mr-auto" />
        <Button title={`Format Query (${metaKey} + k)`} onClick={onFormatClick}>
          Format SQL{" "}
          <span className="inline-flex items-center">
            ({metaIcon}
            <MdAdd />
            k)
          </span>
        </Button>
        <Button
          color="primary"
          title={`Run Query (${metaKey} + return)`}
          isLoading={isRunning}
          onClick={onRunClick}
        >
          Run{" "}
          <span className="inline-flex items-center">
            ({metaIcon}
            <MdAdd />
            <MdOutlineKeyboardReturn />)
          </span>
        </Button>
      </div>
    </div>
  );
}

export default QueryEditor;
