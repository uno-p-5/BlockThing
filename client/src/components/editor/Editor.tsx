import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { gravityPlatformer } from "../../app/(sidebar-layout)/editor/test-data";
import type { Editor, EditorConfiguration, ViewMode } from "./types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

declare global {
  interface Window {
    // trust me bro
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BlockMirror: any;
  }
}

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  projectId: string;
}

export default function Editor({ code, setCode, projectId }: EditorProps) {
  const blockMirrorRef = useRef<HTMLDivElement | null>(null);
  const hasCreatedBlockMirror = useRef(false);
  const projId = projectId;
  const projectData = useQuery(api.project.getCurrentProject, { projectId: projId });
  const updateProject = useMutation(api.project.update);
  const [editor, setEditor] = useState<Editor>();
  const [editorHeight, setEditorHeight] = useState(window.innerHeight - 112);

  useEffect(() => {
    console.log(projectData);
    if (projectData && projectData?.code) {
      setCode(projectData.code);
    }
  }, [projectData]);

  useEffect(() => {
    // Set code based on project data or editor's current code at mount
    if (code) {
      // setCode(editor?.getCode() || "");
      editor?.setCode(code);
    }
  
    // Set up an interval to regularly check the editor's code and sync it
    const intervalId = setInterval(() => {
      const currentCode = editor?.getCode();
  
      // Only update the state if the code is different, without resetting the cursor
      if (currentCode !== code) {
        setCode(currentCode || "");
      }
    }, 1000); // Adjust interval as needed (currently set to 1 second)
  
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [code, editor, projectData]);
  
  useEffect(() => {
    if (code) {
      updateProject({
        project_id: projId,
        code: code,
      });
    }
  }, [code, editor, projId]);
  

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
    const updateHeight = () => {
      setEditorHeight(window.innerHeight - 112); // Adjust x value here
    };

    window.addEventListener("resize", updateHeight);

    const initializeBlockMirror = () => {
      if (
        blockMirrorRef.current &&
        window.BlockMirror &&
        !hasCreatedBlockMirror.current
      ) {
        console.log("BlockMirror is available.");
        const configuration: EditorConfiguration = {
          container: blockMirrorRef.current,
          height: editorHeight.toString(),
          viewMode: "block",
        };

        const editorInstance = new window.BlockMirror(configuration);
        setEditor(editorInstance);
        hasCreatedBlockMirror.current = true;
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

    updateHeight();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateHeight);
    };
  }, [editorHeight]);

  return (
    <div className="w-full max-w-full flex-grow rounded-lg">
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
        />

        {!editor ? (
          <Skeleton
            className={`h-[${editorHeight}px] w-full animate-pulse rounded-md bg-slate-200`}
          />
        ) : null}
      </div>
    </div>
  );
}
