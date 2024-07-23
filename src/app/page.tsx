"use client";
import GridPattern from "@/components/GridPattern";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import SparklesText from "@/components/magicui/sparkles-text";
import { MagicCard } from "@/components/magicui/magic-card";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/starter/Navbar";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {
  const features = [
    {
      title: "Flexible User Roles",
      description:
        "Distinct student and teacher roles with tailored access and capabilities.",
      icon: "👥",
    },
    {
      title: "Comprehensive Student Features",
      description:
        "Enroll in courses, earn certificates, and showcase achievements with public profiles.",
      icon: "🎓",
    },
    {
      title: "Powerful Course Creation Tools",
      description:
        "Teachers can create, plan, and publish courses with videos, attachments, and pricing options.",
      icon: "🎨",
    },
    {
      title: "Automated Communication",
      description:
        "Automatic welcome, course enrollment, and certificate emails to keep users informed.",
      icon: "📧",
    },
    {
      title: "Flexible Course Pricing",
      description:
        "Offer free courses or set custom prices with integrated Razorpay payment processing.",
      icon: "💰",
    },
    {
      title: "Verifiable Certificates",
      description:
        "Generate and verify course completion certificates with unique URLs.",
      icon: "🏆",
    },
  ];

  const { isSignedIn } = useAuth();

  const text = `Empower educators and learners with our innovative learning management system. Experience the future of education with YourLMS's cutting-edge platform.`;

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <GridPattern>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center">
              <p className="font-display text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl md:text-7xl mb-6 text-center max-w-4xl">
                <SparklesText
                  text="YourLMS"
                  className="inline-block mr-2 text-white"
                />
                <br />
                Redefining Education for the Connected World
              </p>
            </div>
            <p className="mt-6 text-xl  max-w-3xl mx-auto">
              <TextGenerateEffect words={text} />
            </p>
            <div className="flex justify-center mt-8">
              <div className="z-10 flex h-24 items-center justify-center">
                <div
                  className={cn(
                    "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-3 transition ease-out hover:duration-300 hover:text-neutral-400">
                    {isSignedIn ? (
                      <Link href="/dashboard">✨ Go to Dashboard</Link>
                    ) : (
                      <SignUpButton
                        forceRedirectUrl="/onboarding"
                        mode="redirect"
                      >
                        ✨ Start Your Learning Journey
                      </SignUpButton>
                    )}
                    <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </div>
            </div>
          </div>
        </GridPattern>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <MagicCard
                key={feature.title}
                className="cursor-pointer p-8"
                gradientColor={"#262626"}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: -50 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Elevate Your Teaching <br /> Amplify Your Learning
        </motion.h1>
      </LampContainer>

      {/* <FeaturesSection /> */}

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <p className="text-lg text-gray-300 mb-4">
                &quot;YourLMS has transformed the way I create and manage my
                online courses. The course studio is intuitive, and the
                integrated payment system makes it easy to monetize my
                expertise.&quot;
              </p>
              <p className="text-blue-400 font-semibold">
                - Dr. J. Manoj Kumar, Online Instructor
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <p className="text-lg text-gray-300 mb-4">
                &quot;As a student, I love how easy it is to enroll in courses
                and track my progress. The shareable certificates and public
                profile feature have helped me showcase my skills to potential
                employers.&quot;
              </p>
              <p className="text-blue-400 font-semibold">
                - L. Vignesh , YourLMS User
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
            Ready to Transform Your Educational Experience?
          </h2>
          <div className="flex justify-center">
            <div className="z-10 flex h-24 items-center justify-center">
              <div
                className={cn(
                  "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-8 py-4 text-xl transition ease-out hover:duration-300 hover:text-neutral-400">
                  {isSignedIn ? (
                    <Link href="/dashboard">✨ Access Your Courses</Link>
                  ) : (
                    <SignUpButton
                      forceRedirectUrl="/onboarding"
                      mode="redirect"
                    >
                      ✨ Join YourLMS Today
                    </SignUpButton>
                  )}
                  <ArrowRightIcon className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center gap-5 pb-10">
        <span>© 2024 YourLMS. All rights reserved.</span>
      </div>
    </div>
  );
}

const FeaturesSection = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: "Custom Signatures",
    description:
      "Personalize certificates with custom signatures for a professional touch.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Lifetime Course Access",
    description:
      "Students and teachers enjoy full access to their courses anytime, anywhere.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Public Profiles",
    description:
      "Showcase achievements and expertise with shareable public profiles for students and teachers.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Secure Certificate Verification",
    description:
      "Ensure the authenticity of certificates with our public verification system.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
];
