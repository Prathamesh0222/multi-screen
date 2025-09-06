"use client";

import { useUrl } from "@/context/url-context";
import { getPlatform } from "@/lib/get-platform";

export default function ScreenPage() {
  const { urls } = useUrl();

  const entries = Object.entries(urls);

  const containerClass =
    entries.length === 1
      ? "grid grid-cols-1"
      : entries.length === 2
      ? "flex flex-col"
      : "grid grid-cols-2";

  return (
    <div className={`${containerClass} h-screen `}>
      {entries.map(([id, url]) => {
        const detected = getPlatform(url);
        if (!detected) return null;

        if (detected.platform === "YOUTUBE") {
          return (
            <iframe
              key={id}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${detected.id}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          );
        }

        if (detected.platform === "TWITCH") {
          return (
            <iframe
              key={id}
              src={`https://player.twitch.tv/?channel=${detected.id}&parent=localhost`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          );
        }

        if (detected.platform === "KICK") {
          return (
            <iframe
              key={id}
              src={`https://player.kick.com/${detected.id}`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          );
        }

        return null;
      })}
    </div>
  );
}
