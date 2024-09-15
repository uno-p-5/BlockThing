import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const FromScratch = ({
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
                Submit
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
