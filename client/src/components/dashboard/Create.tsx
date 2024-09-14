"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export function Create() {
  const create_game = useMutation(api.project.createProject);
  const addProj = useMutation(api.user.addProject);
  const router = useRouter();

  return (
    <div
      onClick={async () => {
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
      }}
      className="flex max-h-fit max-w-fit hover:cursor-pointer"
    >
      <div
        className={cn(
          "flex-center h-40 max-h-40 w-80 max-w-80 flex-col space-y-1 rounded-lg border-2 border-dashed border-slate-950 p-4",
          "transition-colors hover:border-0 hover:text-blue-600/80 hover:ring-[3px] hover:ring-blue-600"
        )}
      >
        <PlusIcon className="size-8" />
        <p className="text-xl font-semibold">Create New</p>
      </div>
    </div>
  );
}
