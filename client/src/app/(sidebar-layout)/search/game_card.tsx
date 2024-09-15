import { MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@headlessui/react";

interface GameCardProps {
  game: Doc<"project">;
}

export function GameCardNoedit({ game }: GameCardProps) {

  return (
    <Link
      href={`/editor/${game?._id}`}
      className="flex max-h-fit w-fit min-w-fit"
    >
      <div
        className={cn(
          "flex-center group relative h-40 w-80 min-w-80 snap-start flex-col space-y-1 overflow-hidden rounded-lg border-2 border-solid border-slate-950",
          "transition-colors hover:border-0 hover:ring-[3px] hover:ring-slate-950"
        )}
      >
        <Image
          src={`/images/games/img${Math.floor(Math.random() * 3) + 1}.png`}
          alt="game"
          width={100}
          height={100}
          className="h-full w-full object-cover blur-sm"
        />

        <div
          className={cn(
            "absolute opacity-100 bottom-0 mt-auto flex h-14 w-full flex-col items-center justify-center space-y-1 bg-slate-100 bg-opacity-90 px-2 py-1 transition-opacity",
          )}
        >
          <p className="mr-auto line-clamp-1 text-left text-lg font-semibold leading-tight">
            {game?.name}
          </p>
          <p className="mr-auto line-clamp-1 overflow-hidden text-ellipsis text-sm leading-tight">
            {game?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
