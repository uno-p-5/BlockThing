import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { ConvexClientProvider } from "@/components/providers/auth-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "next-themes";

import { EditorScripts } from "../components/editor/EditorScripts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Block Thing",
  description: "Reinventing how we learn to code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EditorScripts />
      {/* <ThemeProvider
        attribute="class"
        // defaultTheme="light"
        // enableSystem
        disableTransitionOnChange
      > */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EdgeStoreProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </EdgeStoreProvider>
      </body>
      {/* </ThemeProvider> */}
    </html>
  );
}
