"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

import Navbar from "./_components/nav";

const LandingPage = () => {
  return (
    <div className="relative">
      <Navbar />

      <ContainerScroll titleComponent={<TitleComponent />}>
        <Image
          src={
            "https://media.licdn.com/dms/image/v2/D5603AQHbJl0jTuO93g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679380417011?e=1731542400&v=beta&t=6vgXiJne6iVPNJz9sSN950MeFocWf4jMPCVnd2kYhm0"
          }
          alt="splash of editor"
          width={1200}
          height={1135}
        />
      </ContainerScroll>
    </div>
  );
};

export default LandingPage;

const TitleComponent = () => {
  return (
    <div className="flex-center mb-16 flex-col space-y-4">
      <h1 className="text-9xl font-bold">Block Thing</h1>

      <h2 className="text-medium w-[840px] text-4xl text-[#4B5563]">
        Low-code game development studio built{" "}
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
