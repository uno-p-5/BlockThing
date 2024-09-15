import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Mic, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { AudioManager } from "../whisper/AudioManager";
import { useTranscriber } from "../whisper/hooks/useTranscriber";
import Transcript from "../whisper/Transcript";

export const CreateNew = ({
  setHovered,
}: {
  setHovered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [prompt, setPrompt] = useState("");

  const create_game = useMutation(api.project.createProject);
  const addProj = useMutation(api.user.addProject);
  const router = useRouter();

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  const handlePromptChangeString = (input: string) => {
    setPrompt(input);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setHovered(false);
    }
  };

  const handleSubmitPrompt = async () => {
    try {
      const res = await create_game({
        name: "New Game",
        description: "New Game",
      });
      await addProj({ project_id: res, shared: false });
      router.replace(`/editor/${res}?prompt=${encodeURIComponent(prompt)}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const transcriber = useTranscriber();
  const [showAudio, setShowAudio] = useState(false);

  return (
    <>
      <Dialog
        onOpenChange={handleOpenChange}
        modal={false}
      >
        <DialogTrigger className="h-full min-h-full">
          <div className="flex-center h-[68px]">
            <SparklesIcon className="h-8 w-[100%]" />
          </div>

          <p className="font-semibold leading-tight">New Project</p>
        </DialogTrigger>
        <DialogContent className="z-[999]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              What kind of project do you want to create? Describe it!
              <div className="flex w-full flex-col justify-end space-y-4 pt-4">
                <div className="flex flex-row space-x-2">
                  <Input
                    placeholder="Be Creative!"
                    type="url"
                    onChange={handlePromptChange}
                    value={prompt}
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "my-auto aspect-square size-10 w-10 min-w-10 max-w-10 rounded-full bg-background p-0",
                      showAudio && "ring-2 ring-slate-400"
                    )}
                    onClick={() => setShowAudio((p) => !p)}
                  >
                    <Mic className="size-4" />
                  </Button>
                </div>

                <Button
                  className="ml-auto justify-end"
                  disabled={prompt === ""}
                  onClick={handleSubmitPrompt}
                >
                  Submit
                </Button>

                <div className={cn("mb-4", !showAudio && "hidden")}>
                  <Transcript transcribedData={transcriber.output} />
                  <AudioManager
                    transcriber={transcriber}
                    setInput={handlePromptChangeString}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
