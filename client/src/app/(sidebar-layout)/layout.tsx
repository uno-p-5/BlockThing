"use client";

import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Sidebar } from "../../components/Sidebar";
import Cursors from "@/components/Cursors";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const num = Math.floor(Math.random() * 4) + 1;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Image
          src={`/images/loaders/loader${1}.gif`}
          alt="loading"
          width={100}
          height={100}
        />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] min-w-[100dvw] max-w-[100dvw] overflow-hidden">
      <Sidebar />
      <div className="max-h-[100dvh] w-full">{children}</div>
    </div>
  );
}
