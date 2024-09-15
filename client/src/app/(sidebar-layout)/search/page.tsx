"use client";

import { Search } from "@/components/ui/search";
import { pageStyle } from "@/styles/shared";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { GameCardNoedit } from "./game_card";

export default function Page() {
  const projects = useQuery(api.project.getAllProjects);



  return (
    <div className={`${pageStyle} flex flex-col space-y-16 py-8`}>
      <div className="flex w-full flex-col space-y-4">
        <div className="text-4xl font-semibold">Search for Projects</div>
        <div className="w-full">
          <Search placeholder="Search for new and interesting games!" />
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-4">
        {projects?.map((project, idx) => {
          return <GameCardNoedit key={idx} game={project} />;
        })}
      </div>
    </div>
  );
}
