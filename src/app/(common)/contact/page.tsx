import React from "react";
import RequestForm from "./_components/RequestForm";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const page = () => {
  const { userId } = auth();
  if (!userId)
    return (
      <div className="h-[calc(100vh-90px)] w-full flex flex-col justify-center items-center gap-3">
        Sign in to contact us
        <Button>
          <SignInButton mode="modal" />
        </Button>
      </div>
    );

  return (
    <div className="w-full h-full p-4 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="mb-4 text-sm text-gray-600">
            (Request Courses and talk to us here)
          </p>
        </div>
      </div>
      <RequestForm />
    </div>
  );
};

export default page;
