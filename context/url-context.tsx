"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UrlContextType {
  urls: Record<number, string>;
  setUrl: (id: number, url: string) => void;
  platforms: Record<number, string>;
  setPlatform: (id: number, platform: string) => void;
  resetAll: () => void;
}

const urlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
  const [urls, setUrls] = useState<Record<number, string>>({});
  const [platforms, setPlatforms] = useState<Record<number, string>>({});

  const setUrl = (id: number, url: string) => {
    setUrls((prev) => ({ ...prev, [id]: url }));
  };

  const setPlatform = (id: number, platform: string) => {
    setPlatforms((prev) => ({ ...prev, [id]: platform }));
  };

  const resetAll = () => {
    setUrls({});
    setPlatforms({});
    localStorage.removeItem("urls");
    localStorage.removeItem("platforms");
  };

  useEffect(() => {
    const storedUrls = localStorage.getItem("urls");
    const storedPlatforms = localStorage.getItem("platforms");
    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }
    if (storedPlatforms) {
      setPlatforms(JSON.parse(storedPlatforms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
    localStorage.setItem("platforms", JSON.stringify(platforms));
  }, [urls, platforms]);

  return (
    <urlContext.Provider
      value={{ urls, setUrl, platforms, setPlatform, resetAll }}
    >
      {children}
    </urlContext.Provider>
  );
};

export const useUrl = () => {
  const context = useContext(urlContext);
  if (!context) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
};
