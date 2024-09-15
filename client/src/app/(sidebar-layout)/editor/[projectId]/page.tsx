/**
 * Confused about this file? Yeah. Me too.
 *
 * References:
 * @see {@link https://stackoverflow.com/questions/72599597/what-is-proper-way-to-import-script-files-in-next-js}
 *
 * @see {@link ../EditorScripts.tsx} imported scripts
 * @see {@link ../editor.module.css} imported stylesheets
 * @see {@link client/public} static dist files?
 */

"use client";

import { Chat } from "@/components/editor/Chat";
import { Editor } from "@/components/editor/Editor";

import styles from "../editor.module.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const sparams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [init, setInit] = useState(true);
  const [code, setCode] = useState("");

  const initial_prompt_encoded = sparams.get('prompt') || null;
  if (!initial_prompt_encoded || initial_prompt_encoded === "" || initial_prompt_encoded === null) {
    setInit(false);
  }
  const initial_prompt = decodeURIComponent(initial_prompt_encoded as string);

  return (
    <div
      className={`flex h-full min-h-full w-full flex-row justify-between space-x-8 bg-slate-50 px-8 py-8`}
    >
      <Editor styles={styles} />

      <Chat 
        initialPrompt={initial_prompt}
        code={code}
        setCode={setCode} 
      />
    </div>
  );
}
