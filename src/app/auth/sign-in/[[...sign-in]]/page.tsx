import { SignIn, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <ClerkLoading>loading...</ClerkLoading>
      <SignIn />
    </>
  );
}
