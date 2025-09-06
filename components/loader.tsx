"use client";
import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
export default function LoaderWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="animate-pulse"
        />
      </div>
    );
  }

  return <>{children}</>;
}
