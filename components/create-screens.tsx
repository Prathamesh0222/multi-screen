"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MonitorPlay, Twitch, X, Youtube } from "lucide-react";
import { randomString } from "@/lib/randomString";
import { useRouter } from "next/navigation";
import { useUrl } from "@/context/url-context";
import { getPlatform } from "@/lib/get-platform";
import { toast } from "sonner";
import { Label } from "./ui/label";
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
  const router = useRouter();
  const { urls, setUrl, platforms, setPlatform, resetAll } = useUrl();

  const createCard = () => {
    setCards((prev) => [...prev, prev.length + 1]);
  };

  const removeCard = (id: number) => {
    if (id <= 2) return;
    setCards((prev) => prev.filter((card) => card !== id));
  };

  const handleCreate = () => {
    const validScreens = cards
      .map((id) => {
        const platform = platforms[id];
        const url = urls[id];

        if (!platform || !url) {
          toast.error(`Card ${id}: Please provide both URL and platform`);
          return null;
        }

        const detected = getPlatform(url);
        if (!detected) {
          toast.error(`Card ${id}: Invalid or unsupported URL`);
          return null;
        }

        if (detected.platform !== platform) {
          toast.error(
            `Card ${id}: URL is ${detected.platform}, but you selected ${platform}`
          );
          return null;
        }

        return {
          id: randomString(),
          platform,
          url,
        };
      })
      .filter(Boolean);

    if (validScreens.length > 0) {
      router.push(`/screens/${validScreens[0]?.id}`);
    }
  };

  useEffect(() => {
    resetAll();
  }, []);

  const gridCols = cards.length > 1 ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto p-5 border-x flex flex-col justify-center h-full gap-4">
        <div className={`grid ${gridCols} gap-4`}>
          {cards.map((id) => (
            <Card key={id} className="shadow-none">
              <CardHeader>
                <CardTitle className="flex justify-end">
                  {id > 2 && (
                    <button
                      className="rounded-full p-1.5 bg-background hover:bg-accent border hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer"
                      onClick={() => removeCard(id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Label className="text-sm font-medium">Screen {id}</Label>
                <Input
                  value={urls[id] || ""}
                  className="shadow-none border border-border rounded-lg py-4.5"
                  placeholder="Paste the URL here"
                  onChange={(e) => {
                    setUrl(id, e.target.value);
                  }}
                  required
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Label className="text-sm font-medium text-center">
                  Select Platform
                </Label>
                <div className="flex justify-center gap-2">
                  {PLATFORM_OPTIONS.map((p) => (
                    <div
                      key={p.type}
                      className="flex items-center gap-2 cursor-pointer shadow-none"
                    >
                      <Button
                        variant={
                          platforms[id] === p.type ? "default" : "outline"
                        }
                        onClick={() => setPlatform(id, p.type)}
                        className="flex items-center gap-2 cursor-pointer shadow-none"
                      >
                        {p.icon}
                        {p.label}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button onClick={handleCreate} className="mt-4 cursor-pointer">
            Create
          </Button>
          <Button onClick={createCard} className="mt-4 cursor-pointer">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
