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
                                <button className="px-2 rounded-sm w-full py-1 border-2  mr-1 mb-1 border-black dark:border-white dark:bg-black dark:text-white uppercase bg-white font-semibold text-black transition duration-200 text-sm dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                                    Enter Opennote
                                </button>
                            </a>
                            <div className="rounded-full">
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