import { HeroParallax } from "@/components/ui/hero-parallax";

import states from "/public/states.png";

export function Parallax() {
  return (
    <div>
      <HeroParallax products={PRODUCTS} />
    </div>
  );
}

const PRODUCTS = [
  { title: "", link: "", thumbnail: states as string },
  { title: "", link: "", thumbnail: states as string },
  { title: "", link: "", thumbnail: states as string },
  { title: "", link: "", thumbnail: states as string },
  { title: "", link: "", thumbnail: states as string },
  { title: "", link: "", thumbnail: states as string },
];
