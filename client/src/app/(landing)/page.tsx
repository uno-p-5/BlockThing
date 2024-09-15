"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { ThemeProvider } from "next-themes";
import Image from "next/image";

import Navbar from "./_components/nav";
import { Parallax } from "./_components/parallax";
import bool_nan from "/public/bool_nan.png";
import foobar from "/public/foobar.png";
import my_func from "/public/my_func.png";
import splash from "/public/splash.png";

export default function LandingPage() {
  return (
    <>
      <div className="relative overflow-x-hidden bg-slate-50">
        <Navbar />
        <div>
          <ContainerScroll titleComponent={<TitleComponent />}>
            <Image
              src={splash}
              alt="splash of editor"
              width={1200}
              height={1135}
            />
          </ContainerScroll>
          <Image
            src={bool_nan}
            alt={"bool of NaN"}
            className="absolute -right-20 top-40"
          />
          <Image
            src={my_func}
            alt={"my func"}
            className="absolute -left-32 top-80 rotate-12"
          />
          <Image
            src={foobar}
            alt={"if foo, 'bar"}
            className="absolute -right-20 top-[36rem] -rotate-12"
          />
        </div>
      </div>

      <Parallax />
    </>
  );
}

const TitleComponent = () => {
  return (
    <div className="flex-center mb-16 flex-col space-y-4">
      <h1 className="text-8xl font-bold">Block Thing</h1>

      <h2 className="text-medium w-[840px] text-4xl leading-[1.25] text-[#4B5563]">
        A <span className="underline underline-offset-4">low-code</span> game
        development studio built with the{" "}
        <span className="text-[#F8A935]">
          <br /> fun of <b>Scratch</b>
        </span>
        , and the{" "}
        <span className="text-[#2463EB]">
          capability of <b>OpenAI o1</b>
        </span>
      </h2>
    </div>
  );
};
