"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Sidebar } from "../../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <div>Loading...</div>;
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
