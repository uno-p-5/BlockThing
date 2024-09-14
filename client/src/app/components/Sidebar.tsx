import { Separator } from "@/components/ui/separator";
import { GamepadIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
export function Sidebar() {
  return (
    <div className="flex-between w-12 flex-col items-center border-r-2 p-3 py-6">
      <div className="flex-center flex-col rounded-full ">
        <Link href={"/"}>
          <GamepadIcon className="m-auto" />
        </Link>
        <Separator className="mx-3 my-3 w-5 p-[1px]" />
      </div>

      <div className="mb-auto space-y-2">
        <Link href={"/dashboard"}>
          <LayoutDashboardIcon className="m-auto" />
        </Link>
      </div>

      <div>
        <div>Clerk Stuff</div>
      </div>
    </div>
  );
}
