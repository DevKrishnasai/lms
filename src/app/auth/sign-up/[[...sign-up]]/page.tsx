import { Skeleton } from "@/components/ui/skeleton";
import { ClerkLoading, SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-[300px] w-[25rem] rounded-lg" />
      </ClerkLoading>
      <SignUp />
    </>
  );
}
