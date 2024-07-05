"use client";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        <SignInButton />
      </button>
    </div>
  );
};

export default page;
