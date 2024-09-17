import { ElementRef, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

import { gravityPlatformer } from "../../app/(sidebar-layout)/editor/test-data";
import type { Editor, EditorConfiguration, ViewMode } from "./types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Check, Pencil, Play, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

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
  const [namevalue, setNameValue] = useState(projectData?.name || "New Game");
  const [saveMsg, setSaveMsg] = useState(<span className="flex flex-row items-center"><Save className="h-4 w-4 mr-2" /> Save Code</span>);
  const [editorHeight, setEditorHeight] = useState(window.innerHeight - 112);
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState("");
  const [open, onOpenChange] = useState(false);

  useEffect(() => {
    if (projectData && projectData?.code) {
      // console.log("HERE", projectData.code);
      setCode(projectData.code);
      editor?.setCode(projectData.code);
    }
  }, [projectData, editor, code]);

  useEffect(() => {
    editor?.setCode(code);
  }, [code]);
  
  // useEffect(() => {
  //   if (code) {
  //     updateProject({
  //       project_id: projId,
  //       code: code,
  //     });
  //   }
  // }, [code, editor, projId]);
  

  const handleChangeMode = (value: string) => {
    try {
      if (["split", "block", "text"].includes(value)) {
        editor?.setMode(value as ViewMode);
      }
    } catch {
      // console.error("mode change failed", e.message);
    }
  };

  const handleSave = () => {
    if (editor?.getCode()) {
      updateProject({
        project_id: projId,
        code: code,
      });
    }
    setSaveMsg(
      <span className="flex flex-row items-center">
        <Check className="h-4 w-4 mr-2" /> Saved!
      </span>
    );
  
    setTimeout(() => {
      setSaveMsg(<span className="flex flex-row items-center"><Save className="h-4 w-4 mr-2" /> Save Code</span>);
    }, 2000);
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

    const enableInput = () => {
      setEditing(true);
      setTimeout(() => {
          setNameValue(projectData?.name || "New Game");
          inputRef.current?.focus();
      }, 0)
  }

  const disableInput = () => { setEditing(false); }

  const onInput = (value: string) => {
      setNameValue(value);
      console.log(value);
      updateProject({
          project_id: projId,
          name: value || "Untitled"
      })
  }

  const onKeyDown = (
      event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
      if (event.key === "Enter") {
          event.preventDefault();
          disableInput();
      }
  }

  const handleDescChange = async () => {
    if (desc) {
      updateProject({
        project_id: projId,
        description: desc,
      });
    }
    onOpenChange(false);
  };

  return (
    <div className="w-full max-w-full flex-grow rounded-lg">
      <div className="space-y-2">
        <div className="flex flex-row space-x-4 align-middle items-center">
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={namevalue}
            onChange={(e) => onInput(e.target.value)}
            className="text-lg bg-transparent max-w-[100px] font-bold outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
          <Dialog
            modal={false}
            open={open}
            onOpenChange={() => onOpenChange(!open)}
          >
            <DialogTrigger className="h-full min-h-full">
              <div className="flex-center h-[68px]">
                <Pencil className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" />
              </div>
            </DialogTrigger>
            <DialogContent className="z-[999]">
              <DialogHeader>
                <DialogTitle>Edit Project Description</DialogTitle>
                <DialogDescription>
                  <div className="flex w-full flex-col justify-end space-y-4 pt-4">
                    <div className="flex flex-row space-x-2">
                      <Input
                        placeholder="Tell us about your awesome creation!"
                        type="url"
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                      />
                    </div>

                    <Button
                      className="ml-auto justify-end"
                      disabled={desc === ""}
                      onClick={handleDescChange}
                    >
                      Submit
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
          {/* <Button className="h-9 min-h-0 py-1"><Play className="h-4 w-4 mr-2" />Run Code</Button> */}
          <Button onClick={handleSave} className="h-9 min-h-0 py-1">{saveMsg}</Button>
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
