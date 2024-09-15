"use client";

import { cn } from "@/lib/utils";
import { pageStyle } from "@/styles/shared";
import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Create } from "../../../components/dashboard/Create";
import { GameCard } from "../../../components/dashboard/GameCard";

export default function Page() {
  const user = useQuery(api.user.getCurrentUser);
  const projectsIds = (user?.owned_projects || []).concat(
    user?.shared_projects || []
  );

  const projects = useQuery(api.project.getProjectsByIds, {
    projectIds: projectsIds,
  });

  return (
    <div className={cn(pageStyle)}>
      <h1 className="pb-8 text-4xl font-semibold">
        Welcome back, {user?.name}
      </h1>

      <div className="space-y-0">
        <h2 className="text-2xl font-medium">Your Projects</h2>

        <div className="flex flex-row space-x-4 py-2">
          <Create />
          <div className="flex w-full max-w-full space-x-4 overflow-x-auto px-1 py-2">
            {(projects || []).map((game) => {
              return (
                <GameCard
                  key={game._id}
                  game={game}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
