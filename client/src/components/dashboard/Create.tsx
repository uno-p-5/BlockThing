import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export function Create() {
  return (
    <Link
      href={"/editor"}
      className="flex max-h-fit max-w-fit"
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
    </Link>
  );
}
