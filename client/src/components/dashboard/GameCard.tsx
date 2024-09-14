import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  href: string;
  title: string;
  description: string;
}

export function GameCard({ href, title, description }: GameCardProps) {
  return (
    <Link
      href={href}
      className="flex max-h-fit max-w-fit"
    >
      <div
        className={cn(
          "flex-center group relative h-40 w-80 min-w-80 flex-col space-y-1 overflow-hidden rounded-lg border-2 border-solid border-slate-950",
          "transition-colors hover:border-0 hover:ring-[3px] hover:ring-slate-950"
        )}
      >
        <Image
          src={
            "https://media.licdn.com/dms/image/v2/D5603AQHbJl0jTuO93g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679380417011?e=1731542400&v=beta&t=6vgXiJne6iVPNJz9sSN950MeFocWf4jMPCVnd2kYhm0"
          }
          alt="uno (="
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />

        <div
          className={cn(
            "absolute bottom-0 mt-auto flex h-20 w-full flex-col items-center justify-center space-y-1 bg-slate-100 bg-opacity-90 px-2 py-1 opacity-0 transition-opacity",
            "group-hover:opacity-100"
          )}
        >
          <p className="mr-auto line-clamp-1 text-left text-lg font-semibold leading-tight">
            {title}
          </p>
          <p className="mr-auto line-clamp-2 overflow-hidden text-ellipsis text-sm leading-tight">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
