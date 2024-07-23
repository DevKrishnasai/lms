import Link from "next/link";
import React from "react";
import { CoolMode } from "../magicui/cool-mode";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Features", link: "#features" },
  ];
  return (
    <nav className="fixed w-full z-10 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          YourLMS
        </Link>
        <div className="flex items-center justify-between">
          {links.map((link) => (
            <CoolMode key={link.name}>
              <Link
                key={link.name}
                href={link.link}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            </CoolMode>
          ))}
          <Link
            href="#testimonials"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden md:flex"
          >
            Testimonials
          </Link>
        </div>
        <div className="flex">
          <CoolMode>
            <button className="bg-blue-500 rounded-lg  hover:text-white px-3 py-2 text-sm font-bold animate-pulse">
              <ClerkLoaded>
                <SignInButton forceRedirectUrl="/onboarding" mode="redirect">
                  <p className="hover:scale-120 hover:font-bold ">
                    Start Learning
                  </p>
                </SignInButton>
              </ClerkLoaded>
              <ClerkLoading>loading...</ClerkLoading>
            </button>
          </CoolMode>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
