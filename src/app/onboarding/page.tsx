import { auth, currentUser } from "@clerk/nextjs/server";
import OnboardingForm from "./_components/OnboardingForm";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

const OnboardingPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("auth/sign-in");
  }

  const data = await prisma.user.findUnique({
    where: {
      authId: user.id,
    },
  });
  if (data) {
    if (data.onBoarded) {
      redirect("/dashboard");
    }
  } else {
    await prisma.user.create({
      data: {
        authId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || user.firstName,
        profilePic: user.imageUrl,
      },
    });
  }

  const categories: string[] = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "Blockchain",
    "Digital Marketing",
    "Graphic Design",
    "UX/UI Design",
    "Business Analytics",
    "Project Management",
    "Photography",
    "Music Production",
    "Language Learning",
    "Personal Development",
    "Fitness and Health",
    "Cooking and Nutrition",
  ];

  const learningGoals: string[] = [
    "Career Advancement",
    "Personal Interest",
    "Academic Requirements",
    "Skill Development",
    "Certification",
    "Starting a Business",
  ];
  const roles: string[] = ["Student", "Teacher"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className=" rounded-lg shadow-xl p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center ">
          Welcome to YourLMS, {user?.firstName}!
        </h1>
        <p className="text-lg mb-8 text-center text-gray-600">
          Let&apos;s personalize your learning journey. Tell us a bit about
          yourself and your goals.
        </p>

        <OnboardingForm
          categories={categories}
          learningGoals={learningGoals}
          roles={roles}
          id={user.id}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
