import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { gravityPlatformer } from "../../app/(sidebar-layout)/editor/test-data";
import type { Editor, EditorConfiguration, ViewMode } from "./types";

declare global {
  interface Window {
    // trust me bro
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BlockMirror: any;
  }
}

export function Editor({
  styles,
}: {
  styles: { readonly [key: string]: string };
}) {
  const blockMirrorRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editor, setEditor] = useState<Editor>();

  const handleChangeMode = (value: string) => {
    try {
      if (["split", "block", "text"].includes(value)) {
        editor?.setMode(value as ViewMode);
      }
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
        const configuration: EditorConfiguration = {
          container: blockMirrorRef.current,
          height: "758",
          viewMode: "block",
        };

        const editorInstance = new window.BlockMirror(configuration);
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
    <div className="flex-grow rounded-lg">
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
