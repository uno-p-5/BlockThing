import { Create } from "../../../components/dashboard/Create";
import { GameCard } from "../../../components/dashboard/GameCard";

export default function Page() {
  return (
    <div className="px-4 py-6">
      <h1 className="pb-8 text-4xl font-semibold">
        Welcome back, James Beavers
      </h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium">Your Projects</h2>

        <div className="flex w-fit flex-row space-x-4 overflow-scroll p-1">
          <Create />
          {GAMES.map((game) => (
            <GameCard
              key={game.href}
              href={game.href}
              title={game.title}
              description={game.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const GAMES = [
  {
    href: "/123",
    title: "Flappy Bird",
    description:
      "Eu esse ea aliquip sunt sint magna non minim culpa veniam anim.",
  },
  {
    href: "/456",
    title: "Planet Platformer",
    description:
      "Aliqua occaecat et nulla Lorem culpa fugiat adipisicing reprehenderit ad consequat. I am typing a long description.",
  },
  {
    href: "/789",
    title: "Doodle Stick Fighter Game",
    description:
      "Cillum anim ex anim duis sit non sint voluptate ipsum ut veniam ullamco.",
  },
];
