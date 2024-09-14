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

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { pageStyle } from "@/styles/shared";

import styles from "./editor.module.css";
import { gravityPlatformer } from "./test-data";

declare global {
  interface Window {
    // trust me bro
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BlockMirror: any;
  }
}

export default function Page() {
  const blockMirrorRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editor, setEditor] = useState<any>();

  const handleChangeMode = (value: string) => {
    try {
      editor?.setMode(value);
    } catch {
      // @ts-expect-error trust me bro
      console.error("mode change failed", e.message);
    }
  };

  const handleInject = () => {
    try {
      editor?.setCode(gravityPlatformer);
    } catch (e) {
      // @ts-expect-error trust me bro
      console.error("code injection failed", e.message);
    }
  };

  useEffect(() => {
    const initializeBlockMirror = () => {
      if (blockMirrorRef.current && window.BlockMirror) {
        console.log("BlockMirror is available.");
        const configuration = {
          container: blockMirrorRef.current,
        };

        const editorInstance = new window.BlockMirror(configuration);
        editorInstance.setMode("block");
        setEditor(editorInstance); // Assign the editor instance to the state variable
      } else {
        console.log("BlockMirror not available yet.");
      }
    };

    const intervalId = setInterval(() => {
      if (window.BlockMirror) {
        initializeBlockMirror();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={pageStyle}>
      <div className="space-y-2">
        <div className="flex flex-row space-x-4 align-middle">
          <Tabs
            defaultValue="block"
            className="w-fit"
            onValueChange={handleChangeMode}
          >
            <TabsList>
              <TabsTrigger value="block">Block</TabsTrigger>
              <TabsTrigger value="text">Python</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="my-auto pl-1">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                true
                  ? "bg-green-500 ring-2 ring-green-500 ring-offset-2"
                  : "bg-red-500 ring-2 ring-red-500 ring-offset-2"
              )}
            />
          </div>

          <Button onClick={handleInject}>Inject Code</Button>
        </div>

        <div
          id="blockmirror-editor"
          ref={blockMirrorRef}
          className={styles.active}
          style={{ height: "100%" }}
        />

        {!editor ? (
          <Skeleton className="h-[500px] w-full animate-pulse rounded-md bg-slate-200" />
        ) : null}
      </div>
    </div>
  );
}
