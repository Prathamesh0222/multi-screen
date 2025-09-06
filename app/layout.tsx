import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Rubik } from "next/font/google";
import { UrlProvider } from "@/context/url-context";
import { Toaster } from "sonner";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi-Screen",
  description: "Platform for managing multiple screens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UrlProvider>{children}</UrlProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
