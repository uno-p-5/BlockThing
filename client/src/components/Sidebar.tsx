"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import {
  GamepadIcon,
  LayoutDashboardIcon,
  PencilIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { api } from "../../convex/_generated/api";

export function Sidebar() {
  const pathname = usePathname();
  const user = useQuery(api.user.getCurrentUser);

  return (
    <div className="flex-between w-12 flex-col items-center border-r-2 p-3 py-6">
      <div className="flex-center flex-col rounded-full">
        <Link href={"/"}>
          <GamepadIcon className="m-auto" />
        </Link>
        <Separator className="mx-3 my-3 w-5 p-[1px]" />
      </div>

      <div className="mb-auto flex flex-col gap-y-3 space-y-3">
        <Link href={"/dashboard"}>
          <LayoutDashboardIcon
            className={cn(
              "m-auto",
              pathname === "/dashboard" ? "text-blue-500" : null
            )}
          />
        </Link>
        <Link href={"/editor"}>
          <PencilIcon
            className={cn(
              "m-auto",
              pathname === "/editor" ? "text-blue-500" : null
            )}
          />
        </Link>
        <Link href={"/search"}>
          <SearchIcon
            className={cn(
              "m-auto",
              pathname === "/search" ? "text-blue-500" : null
            )}
          />
        </Link>
        {/* <Link href={"/dashboard#games"}>
          <GamepadIcon
            className={cn(
              "m-auto",
              pathname === "/dashboard?games=true" ? "text-blue-500" : null
            )}
          />
        </Link> */}
      </div>

      <div>{user ? <UserButton /> : null}</div>
    </div>
  );
}
