"use client";

import { useQuery } from "convex/react";
import { Create } from "../../../components/dashboard/Create";
import { GameCard } from "../../../components/dashboard/GameCard";
import { api } from "../../../../convex/_generated/api";

export default function Page() {
  const user = useQuery(api.user.getCurrentUser);
  const projectsIds = (user?.owned_projects || []).concat(user?.shared_projects || []);

  const projects = useQuery(api.project.getProjectsByIds, { projectIds: projectsIds });

  return (
    <div className="px-4 py-6">
      <h1 className="pb-8 text-4xl font-semibold">
        Welcome back, {user?.name}
      </h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium">Your Projects</h2>

        <div className="flex w-fit flex-row space-x-4 overflow-scroll p-1">
          <Create />
          {(projects || []).map((game, idx) => {
            return (
              <GameCard
                key={idx}
                game={game}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}