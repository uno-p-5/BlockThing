/**
 * Confused about this file? Yeah. Me too.
 *
 * References:
 * @see {@link https://stackoverflow.com/questions/72599597/what-is-proper-way-to-import-script-files-in-next-js}
 *
 * @see {@link ./EditorScripts.tsx} imported scripts
 * @see {@link ./editor.module.css} imported stylesheets
 * @see {@link client/public} static dist files?
 */
"use client";

import { useState } from "react";

import { Chat } from "@/components/editor/Chat";
// import { Editor } from "@/components/editor/Editor";

import styles from "../../../../components/editor/editor.module.css";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
// import Cursors from "@/components/Cursors";
const Editor = dynamic(() => import("@/components/editor/Editor"), { ssr: false });
const Cursors = dynamic(() => import("@/components/Cursors"), { ssr: false });

export default function Page() {
  let initial_prompt: string | null;
  const [code, setCode] = useState("");
  const sparams = useSearchParams();
  const initial_prompt_encoded = sparams.get("prompt") || null;
  if (
    !initial_prompt_encoded ||
    initial_prompt_encoded === "" ||
    initial_prompt_encoded === null
  ) {
    initial_prompt = null;
  } else {
    initial_prompt = decodeURIComponent(initial_prompt_encoded as string);
  }

  console.log(styles) 


  return (
    <div
      className={`flex h-full min-h-full w-full max-w-full flex-row justify-between space-x-8 bg-slate-50 px-8 py-8`}
    >
      <Editor />
      <Cursors />
      <Chat
        initialPrompt={initial_prompt}
        code={code}
        setCode={setCode}
      />
    </div>
  );
}
