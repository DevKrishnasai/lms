import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import ToastProvider from "@/providers/toast-provider";
import { ContextProvider } from "@/providers/context-provider";
import Loading from "@/components/Loading";
import "./globals.css";
import "@uploadthing/react/styles.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
<link
  rel="stylesheet"
  href="https://video-react.github.io/assets/video-react.css"
/>;
export const metadata: Metadata = {
  title: "LMS Portal",
  description: "LMS portal for students and teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader />
          <ContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* <ClerkLoading>
                <Loading />
              </ClerkLoading> */}
              {/* <ClerkLoaded>{children}</ClerkLoaded> */}
              {children}
              <ToastProvider />
            </ThemeProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
