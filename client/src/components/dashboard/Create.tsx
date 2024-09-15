"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

import { CreateNew } from "./CreateNew";
import { FromScratch } from "./FromScratch";

export function Create() {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHovered(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="flex max-h-fit max-w-fit hover:cursor-pointer"
      onMouseOver={handleMouseOver}
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
