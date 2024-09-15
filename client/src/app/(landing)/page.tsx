"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

import Navbar from "./_components/nav";
import bool_nan from "/public/bool_nan.png";
import foobar from "/public/foobar.png";
import my_func from "/public/my_func.png";
import splash from "/public/splash.png";

const LandingPage = () => {
  return (
    <div className="relative overflow-x-hidden bg-slate-50">
      <Navbar />

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
  );
};

export default LandingPage;

const TitleComponent = () => {
  return (
    <div className="flex-center mb-16 flex-col space-y-4">
      <h1 className="text-8xl font-bold">Block Thing</h1>

      <h2 className="text-medium w-[840px] text-4xl text-[#4B5563]">
        <span className="underline underline-offset-4">Low-code</span> game
        development studio built{" "}
        <span className="text-[#F8A935]">
          with the fun of <b>Scratch</b>
        </span>
        , and{" "}
        <span className="text-[#2463EB]">
          the power of <b>AI</b>
        </span>
      </h2>
    </div>
  );
};
