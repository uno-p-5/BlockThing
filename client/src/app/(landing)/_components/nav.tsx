"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { GamepadIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="absolute z-10 my-auto h-14 w-full border-b-2 border-slate-200 px-4 pt-2">
      <div className="flex flex-row items-center justify-between">
        <div className="my-auto flex space-x-2 align-middle">
          <GamepadIcon className="size-8 rounded-full bg-blue-600 p-1 text-slate-50" />
          <h6 className="my-auto h-fit text-lg font-bold">Block Thing</h6>
        </div>
        <div>
          <div className="flex w-full items-center justify-between gap-x-4">
            {isLoading && <div>Loading</div>}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl={"/dashboard"}
                  signUpForceRedirectUrl={"/dashboard"}
                  signUpFallbackRedirectUrl={"/dashboard"}
                  fallbackRedirectUrl={"/dashboard"}
                >
                  <Button
                    variant="link"
                    size="sm"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton
                  mode="modal"
                  forceRedirectUrl={"/dashboard"}
                  signInFallbackRedirectUrl={"/dashboard"}
                  signInForceRedirectUrl={"/dashboard"}
                  fallbackRedirectUrl={"/dashboard"}
                >
                  <Button className="h-9 min-h-0 py-1">Get Started</Button>
                </SignUpButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <div className="my-auto flex flex-auto grid-cols-2 flex-row gap-x-4">
                <Link
                  href="/dashboard"
                  className="pr-1"
                >
                  <Button className="h-9 min-h-0 py-1">Enter Block Thing</Button>
                </Link>
                <div className="rounded-full pr-2 pt-1">
                  <UserButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
