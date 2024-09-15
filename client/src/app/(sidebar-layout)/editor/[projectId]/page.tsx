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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";

// import { Editor } from "@/components/editor/Editor";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});
// const Cursors = dynamic(() => import("@/components/Cursors"), { ssr: false });

export default function Page() {
  let initial_prompt: string | null;
  const { projectId, scratchLink } = useParams();
  const project_id = Array.isArray(projectId) ? projectId[0] : projectId;

  const [code, setCode] = useState("");

  const initial_prompt_encoded = projectId || null;
  if (
    !initial_prompt_encoded ||
    initial_prompt_encoded === "" ||
    initial_prompt_encoded === null
  ) {
    initial_prompt = null;
  } else {
    initial_prompt = decodeURIComponent(initial_prompt_encoded as string);
  }

  const [loadingScratch, setLoadingScratch] = useState(false);
  const idMatch = decodeURIComponent(scratchLink)?.match(/projects\/(\d+)/); // ! fix me

  useEffect(() => {
    const handleImportScratch = async () => {
      setLoadingScratch(true);

      try {
        console.log("it");
        const response = await fetch("/api/sbdl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: idMatch![1] }),
        });

        console.log("first resp", response);

        if (!response.ok) {
          throw new Error("Failed to import Scratch project");
        }

        const pythonResponse = await fetch("/file/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: response.json() }),
        });

        console.log(pythonResponse);
      } catch (e) {
        console.error("An error occurred importing scratch game");
      } finally {
        setLoadingScratch(false);
      }
    };

    if (scratchLink && scratchLink !== "" && scratchLink !== null) {
      handleImportScratch();
      setLoadingScratch(false);
    }
  }, [idMatch, scratchLink]);

  return (
    <div
      className={`flex h-full min-h-full w-full max-w-full flex-row justify-between space-x-8 bg-slate-50 px-8 py-8`}
    >
<<<<<<< HEAD
      <Editor 
        code={code} 
        setCode={setCode} 
        projectId={project_id} 
=======
      <Editor
        code={code}
        setCode={setCode}
        projectId={project_id}
>>>>>>> 83f9fab28abd1259c80c3eebae4a1aada7967513
      />
      {/* <Cursors /> */}
      <Chat
        initialPrompt={initial_prompt}
        code={code}
        setCode={setCode}
        project_id={project_id}
      />

      <Dialog
        open={loadingScratch}
        modal={false}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-auto flex flex-row space-x-2 align-middle">
              <span>Importing from Scratch</span>
              <Loader2 className="size-5 animate-spin" />
            </DialogTitle>
            {/* <DialogDescription>
              <Loader2 className="animate-spin" />
            </DialogDescription> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
