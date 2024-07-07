/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInButton, ClerkLoading } from "@clerk/nextjs";
import React, { useEffect } from "react";

const page = () => {
  const [secret, setSecret] = React.useState("");

  return (
    <div className="mx-auto h-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-4xl font-bold">Private page</div>
      <Input onChange={(e) => setSecret(e.target.value)} className="w-50" />
      <Button>
        <ClerkLoading>loading....</ClerkLoading>
        <SignInButton forceRedirectUrl={`/private/${secret}`} />
      </Button>
    </div>
  );
};

export default page;
