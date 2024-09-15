"use client";

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
import { MicIcon, PlusIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";

export function Create() {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="flex max-h-fit max-w-fit hover:cursor-pointer"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {hovered ? (
        <div className="flex h-40 max-h-40 w-80 max-w-80 flex-row space-x-2">
          <div
            className={cn(
              "flex-center h-full w-40 flex-col rounded-lg border-2 p-4 text-center",
              "transition-colors hover:border-0 hover:ring-[3px] hover:ring-blue-600"
            )}
          >
            <FromScratch setHovered={setHovered} />
          </div>

          <div
            className={cn(
              "flex-center h-full w-40 flex-col rounded-lg border-2 p-4 text-center",
              "transition-colors hover:border-0 hover:ring-[3px] hover:ring-blue-600"
            )}
          >
            <CreateNew setHovered={setHovered} />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex-center h-40 max-h-40 w-80 max-w-80 flex-col space-y-1 rounded-lg border-2 border-dashed border-slate-950 p-4"
          )}
        >
          <PlusIcon className="size-8" />
          <p className="text-xl font-semibold">Create New</p>
        </div>
      )}
    </div>
  );
}

const CreateNew = ({
  setHovered,
}: {
  setHovered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [prompt, setPrompt] = useState("");

  const create_game = useMutation(api.project.createProject);
  const addProj = useMutation(api.user.addProject);
  const router = useRouter();

  const handleCreateNew = async () => {
    try {
      const res = await create_game({
        name: "New Game",
        description: "New Game",
      });
      await addProj({ project_id: res, shared: false });
      router.push(`/editor/${res}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setHovered(false);
    }
  };

  const handleSubmitPrompt = () => {
    console.log(`submitted: ${prompt}`);
    setHovered(false);
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger className="h-full min-h-full">
          <div className="flex-center h-[68px]">
            <SparklesIcon className="h-8 w-[100%]" />
          </div>

          <p className="font-semibold leading-tight">Create new project</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              What do you want to build today?
              <div className="flex w-full flex-col justify-end space-y-4 pt-4">
                <div className="flex flex-row space-x-2">
                  <Input
                    placeholder="Describe your project! Be Creative!"
                    type="url"
                    onChange={handlePromptChange}
                  />
                  <Button variant={"secondary"}>
                    <MicIcon />
                  </Button>
                </div>

                <Button
                  className="ml-auto justify-end"
                  disabled={prompt === ""}
                  onClick={handleSubmitPrompt}
                >
                  Submit
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FromScratch = ({
  setHovered,
}: {
  setHovered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [scratchLink, setScratchLink] = useState("");

  const handleScratchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScratchLink(e.currentTarget.value);
  };

  const handleSubmitScratch = () => {
    console.log(`submitted: ${scratchLink}`);
    setHovered(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setHovered(false);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger className="h-full min-h-full">
        <Image
          src={
            "https://logos-world.net/wp-content/uploads/2023/08/Scratch-Emblem.png"
          }
          alt="scratch logo"
          width={120}
          height={68}
          className="w-[100%]"
        />

        <p className="font-semibold leading-tight">Import from Scratch</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from Scratch</DialogTitle>
          <DialogDescription>
            Paste in the public URL of your project
            <div className="flex w-full flex-col justify-end space-y-4 pt-4">
              <Input
                placeholder="...public Scratch link"
                type="url"
                onChange={handleScratchChange}
              />

              <Button
                className="ml-auto justify-end"
                disabled={scratchLink === ""}
                onClick={handleSubmitScratch}
              >
                Submit
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
