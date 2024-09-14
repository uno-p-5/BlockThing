"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Sidebar } from "../../components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const num = Math.floor(Math.random() * 4) + 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Image src={`/images/loaders/loader${1}.gif`} 
              alt="loading" width={100} height={100} />
      </div>
    )
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
