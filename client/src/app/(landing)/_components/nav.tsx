"use client";

import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return ( 
        <nav className="absolute w-full pt-2 px-4">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold">Block App</h1>
                <div>
                    <div className="justify-between w-full flex items-center gap-x-4">
                        {isLoading && (
                            <div>
                                Loading
                            </div>
                        )}
                        {!isAuthenticated && !isLoading && (
                            <>
                                <SignInButton 
                                    mode="modal"
                                    forceRedirectUrl={"/dashboard"}
                                    signUpForceRedirectUrl={"/dashboard"}
                                    signUpFallbackRedirectUrl={"/dashboard"}
                                    fallbackRedirectUrl={"/dashboard"}
                                >
                                    <Button variant="link" size="sm">
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
                                    <Button>
                                        Get Started
                                    </Button>
                                </SignUpButton>
                            </>
                        )}
                        {isAuthenticated && !isLoading && (
                            <div className="flex flex-row grid-cols-2 gap-x-4">
                            <a href="/dashboard" className="pr-1">
                                <Button>
                                    Enter Blocks
                                </Button>
                            </a>
                                <div className="rounded-full pt-1 pr-2">
                                    <UserButton />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;