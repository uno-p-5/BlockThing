"use client";

import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { GamepadIcon, LayoutDashboardIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import { api } from "../../convex/_generated/api";

export function Sidebar() {
  const user = useQuery(api.user.getCurrentUser);

  return (
    <div className="flex-between w-12 flex-col items-center border-r-2 p-3 py-6">
      <div className="flex-center flex-col rounded-full">
        <Link href={"/"}>
          <GamepadIcon className="m-auto" />
        </Link>
        <Separator className="mx-3 my-3 w-5 p-[1px]" />
      </div>

      <div className="mb-auto flex flex-col space-y-3">
        <Link href={"/dashboard"}>
          <LayoutDashboardIcon className="m-auto" />
        </Link>
        <Link href={"/editor"}>
          <PencilIcon className="m-auto" />
        </Link>
      </div>

      <div>{user ? <UserProfile /> : null}</div>
    </div>
  );
}
