import { Search } from "@/components/ui/search";
import { pageStyle } from "@/styles/shared";

export default function Page() {
  return (
    <div className={`${pageStyle} flex flex-col space-y-16 py-8`}>
      <div className="flex w-full flex-col space-y-4">
        <div className="text-4xl font-semibold">Search for Projects</div>
        <div className="w-full">
          <Search placeholder="Search for 'Flappy Bird' or 'Doodle Fight" />
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div>thing</div>
        <div>thing</div>
        <div>thing</div>
        <div>thing</div>
      </div>
    </div>
  );
}
