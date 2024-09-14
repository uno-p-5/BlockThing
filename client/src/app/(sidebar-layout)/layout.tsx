"use client";

// import type { Metadata } from "next";

import { Sidebar } from "../../components/Sidebar";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  // if(isLoading) { return (
  //   <div>Loading Dev...</div>
  // )}

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
