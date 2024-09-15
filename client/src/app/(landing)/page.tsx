"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Separator } from "@/components/ui/separator";
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

      <div className="-mt-60 h-[100dvh] bg-[#2D2D2D] px-40 py-20 text-slate-50">
        <p className="text-4xl font-semibold">
          {"~"}43% of U.S. high schools{" "}
          <span className="text-red-500 underline underline-offset-2">
            lack
          </span>{" "}
          Computer Science courses
        </p>

        <p></p>
      </div>
    </div>
  );
};

export default LandingPage;

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
