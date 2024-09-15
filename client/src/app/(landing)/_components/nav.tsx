"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="absolute z-10 my-auto h-14 w-full border-b-2 border-slate-200 px-4 pt-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold">Block App</h1>
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
                  <Button>Get Started</Button>
                </SignUpButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <div className="flex grid-cols-2 flex-row gap-x-4">
                <a
                  href="/dashboard"
                  className="pr-1"
                >
                  <Button>Get Started</Button>
                </a>
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
