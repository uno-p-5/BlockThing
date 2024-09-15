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

import { useEffect, useState } from "react";

import { Chat } from "@/components/editor/Chat";
import { Editor } from "@/components/editor/Editor";
import webSocketService from "../../../../lib/wsmanager";

import styles from "../../../../components/editor/editor.module.css";
import { useSearchParams } from "next/navigation";
import { Cursor } from "@/lib/types";

export default function Page() {
  let initial_prompt: string | null;
  const [code, setCode] = useState("");
  // const [wsCursors, setWsCursors] = useState<Cursor[]>([]);
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

  useEffect(() => {
    const logCursorPosition = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      console.log(`Cursor position: X=${clientX}, Y=${clientY}`);
    };

    window.addEventListener("mousemove", logCursorPosition);
    return () => {
      window.removeEventListener("mousemove", logCursorPosition);
    };
  }, []); 

  useEffect(() => {
    // webSocketService.onMessage((cursors: Cursor[]) => {
    //   setMessages((prev) => {
    //     const newMessages = prev.slice(0, -1);
    //     const _messages = [
    //       ...newMessages,
    //       {
    //         content: chatHistory.at(-1) || "Error, please try again later.",
    //         isUser: false,
    //         isFile: false,
    //       },
    //     ];
    //     updateChat(chatId, undefined, _messages);
    //     return _messages;
    //   });
    //   setResponseLoading(false);
    // });
  }, []);



  return (
    <div
      className={`flex h-full min-h-full w-full max-w-full flex-row justify-between space-x-8 bg-slate-50 px-8 py-8`}
    >
      {/* <Cursors  */}
      <Editor />

      <Chat
        initialPrompt={initial_prompt}
        code={code}
        setCode={setCode}
      />
    </div>
  );
}
