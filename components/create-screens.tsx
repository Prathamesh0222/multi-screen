"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MonitorPlay, Twitch, Youtube } from "lucide-react";

interface PlatformProps {
  label: string;
  type: "YOUTUBE" | "TWITCH" | "KICK";
  icon: React.ReactNode;
}

const PLATFORM_OPTIONS: PlatformProps[] = [
  { type: "YOUTUBE", label: "YouTube", icon: <Youtube className="w-4 h-4" /> },
  { type: "TWITCH", label: "Twitch", icon: <Twitch className="w-4 h-4" /> },
  { type: "KICK", label: "Kick", icon: <MonitorPlay className="w-4 h-4" /> },
];

export const CreateScreen = () => {
  const [cards, setCards] = useState<number[]>([1, 2, 3, 4]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    Record<number, PlatformProps | null>
  >({});

  const createCard = () => {
    setCards((prev) => [...prev, prev.length + 1]);
  };

  const handleSelectPlatform = (id: number, platform: PlatformProps) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [id]: platform,
    }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-5 border-x flex flex-col justify-center gap-4 h-full">
        <div className="grid grid-cols-2 gap-4">
          {cards.map((id) => (
            <Card key={id} className="shadow-none">
              <CardContent>
                <Input
                  className="shadow-none border border-border rounded-lg py-4.5"
                  placeholder="Paste the URL here"
                />
              </CardContent>
              <CardFooter className="flex justify-center gap-2">
                {PLATFORM_OPTIONS.map((p) => (
                  <Button
                    variant={
                      selectedPlatforms[id]?.type === p.type
                        ? "default"
                        : "outline"
                    }
                    key={p.type}
                    onClick={() => handleSelectPlatform(id, p)}
                    className="flex items-center gap-2 cursor-pointer shadow-none"
                  >
                    {p.icon}
                    {p.label}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button onClick={createCard} className="mt-4 cursor-pointer">
          Add
        </Button>
      </div>
    </div>
  );
};
