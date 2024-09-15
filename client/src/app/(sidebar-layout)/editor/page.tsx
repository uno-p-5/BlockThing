
"use client";

import { Chat } from "@/components/editor/Chat";
import { Editor } from "@/components/editor/Editor";

import styles from "../../../components/editor/editor.module.css";
import { useState } from "react";

export default function Page() {
  const [code, setCode] = useState("");

  return (
    <div
      className={`flex h-full min-h-full w-full max-w-full flex-row justify-between space-x-8 bg-slate-50 px-8 py-8`}
    >
      <Editor styles={styles} />

      <Chat 
        initialPrompt={null}
        code={code}
        setCode={setCode} 
      />
    </div>
  );
}
 
