"use client";
import GridPattern from "@/components/GridPattern";
import { useState } from "react";
import Link from "next/link";
import { CoolMode } from "@/components/magicui/cool-mode";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import SparklesText from "@/components/magicui/sparkles-text";
import { Sliders } from "@/components/Sliders";
import { MagicCard } from "@/components/magicui/magic-card";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Intuitive Course Creation",
      description:
        "Design engaging courses with our user-friendly interface. Drag-and-drop elements, multimedia integration, and customizable templates make course creation a breeze.",
      icon: "📚",
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain deep insights into student performance and engagement. Our analytics tools help you track progress, identify areas for improvement, and optimize your teaching methods.",
      icon: "📊",
    },
    {
      title: "Interactive Learning Tools",
      description:
        "Enhance student engagement with built-in quizzes, discussions, and collaborative projects. Foster a dynamic learning environment that goes beyond traditional methods.",
      icon: "🔧",
    },
  ];

  const links = [
    { name: "Home", link: "/" },
    { name: "Features", link: "#features" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  const router = useRouter();

  const { isSignedIn } = useUser();

  // const handleClick = () => {
  //   const duration = 5 * 1000;
  //   const animationEnd = Date.now() + duration;
  //   const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  //   const randomInRange = (min: number, max: number) =>
  //     Math.random() * (max - min) + min;

  //   const interval = window.setInterval(() => {
  //     const timeLeft = animationEnd - Date.now();

  //     if (timeLeft <= 0) {
  //       return clearInterval(interval);
  //     }

  //     const particleCount = 50 * (timeLeft / duration);
  //     confetti({
  //       ...defaults,
  //       particleCount,
  //       origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //     });
  //     confetti({
  //       ...defaults,
  //       particleCount,
  //       origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  //     });
  //   }, 250);
  // };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                YourLMS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
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
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <GridPattern>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center">
              <p className="font-display text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl md:text-7xl mb-6 text-center max-w-4xl">
                <SparklesText text="YourLMS" className="inline-block mr-2" />
                Empowering Education, Simplifying Management
              </p>
            </div>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Empower your educational journey with our intuitive, powerful, and
              beautifully designed learning management system.
            </p>
            <div className=" flex justify-center">
              <div className="z-10 flex h-24 items-center justify-center">
                <div
                  className={cn(
                    "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    {isSignedIn ? (
                      <Link href="/courses">✨ Go to Courses</Link>
                    ) : (
                      // <Link href="#signin" onClick={handleClick}>
                      <SignInButton forceRedirectUrl="/courses" mode="modal">
                        ✨ Get Started
                      </SignInButton>
                      // </Link>
                    )}
                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </div>
            </div>
          </div>
        </GridPattern>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b  to-black">
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
                {/* <div className="bg-gray-800 rounded-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-2"> */}
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
                {/* </div> */}
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <Sliders />

      {/* About Section */}
      {/* <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Our Story
          </h2>
          <div className="bg-gray-800 rounded-lg p-10 shadow-xl">
            <p className="text-xl text-gray-300 leading-relaxed">
              YourLMS was born from a passion for education and technology. Our
              journey began with a simple question: How can we make learning
              more accessible, engaging, and effective for everyone?
            </p>
            <p className="text-xl text-gray-300 mt-6 leading-relaxed">
              Today, we're proud to offer a cutting-edge learning management
              system that empowers educators and students alike. Our mission is
              to break down barriers to education and foster a global community
              of lifelong learners.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="#team"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition duration-300"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section
        id="contact"
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
            Get in Touch
          </h2>
          <div className="bg-gray-800 rounded-lg p-10 shadow-xl">
            <p className="text-xl text-center text-gray-300 mb-8">
              Have questions or want to learn more? We'd love to hear from you!
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
              <Link
                href="mailto:contact@yourlms.com"
                className="bg-gradient-to-r from-pink-400 to-orange-500 text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us
              </Link>
              <Link
                href="#demo"
                className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <div className="flex justify-center items-center gap-5 pb-10">
        <span>@2024 YourLMS. All rights reserved. </span>
      </div>
    </div>
  );
}
