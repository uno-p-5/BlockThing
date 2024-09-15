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
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const FromScratch = ({
  setHovered,
}: {
  setHovered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [scratchLink, setScratchLink] = useState("");
  const [loading, setLoading] = useState(false);

  const create_game = useMutation(api.project.createProject);
  const addProj = useMutation(api.user.addProject);
  const router = useRouter();

  const handleScratchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScratchLink(e.currentTarget.value);
  };

  const handleSubmitScratch = async () => {
    // const idMatch = scratchLink.match(/projects\/(\d+)/);

    // if (!idMatch || idMatch === null) {
    //   console.error("Invalid Scratch link");
    //   return;
    // }

    // const projectId = idMatch![1];
    // console.log(`Submitted project ID: ${projectId}`);

    // let abuf: ArrayBufferLike;

    // try {
    //   setLoading(true);
    //   const response = await fetch("/api/sbdl", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id: projectId }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to import Scratch project");
    //   }

    //   const data = await response.json();
    //   console.log("Project data:", data);

    //   // Step 1: Convert JSON to a string
    // const jsonString = JSON.stringify(data.buf);

    //   // Step 2: Encode the string to UTF-8
    //   const encoder = new TextEncoder();
    //   const uint8Array = encoder.encode(jsonString);

    //   // Step 3: Extract the ArrayBuffer
    //   const arrayBuffer = uint8Array.buffer;
    //   abuf = arrayBuffer;

    //   const resp2 = await fetch("/file/download", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ data: data }),
    //   });

    //   if (!resp2.ok) {
    //     throw new Error("Failed to send Scratch project to backend");
    //   }

    //   const data2 = await resp2.json();
    //   console.log("resp 2", data2);
    // } catch (error) {
    //   console.error("Error importing Scratch project:", error);
    // } finally {
    //   setLoading(false);
    // }

    try {
      const res = await create_game({
        name: "New Game",
        description: "New Game",
      });
      await addProj({ project_id: res, shared: false });

      router.replace(
        `/editor/${res}?scratchLink=${encodeURIComponent(scratchLink)}`
      );
    } catch (error) {
      console.error("Error creating game:", error);
    }
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
            Paste in the Public URL of your Scratch Project
            <div className="flex w-full flex-col justify-end space-y-4 pt-4">
              <Input
                placeholder="Link here..."
                type="url"
                onChange={handleScratchChange}
              />

              <Button
                className="ml-auto justify-end"
                disabled={scratchLink === ""}
                onClick={handleSubmitScratch}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
