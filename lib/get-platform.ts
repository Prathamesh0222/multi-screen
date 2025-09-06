export const getPlatform = (url: string) => {
  try {
    const parsed = new URL(url);

    // YouTube
    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname === "youtu.be"
    ) {
      if (parsed.hostname === "youtu.be") {
        return { platform: "YOUTUBE", id: parsed.pathname.slice(1) };
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return { platform: "YOUTUBE", id: parsed.pathname.split("/")[2] };
      }
      return { platform: "YOUTUBE", id: parsed.searchParams.get("v") || "" };
    }

    // Twitch
    if (parsed.hostname.includes("twitch.tv")) {
      return { platform: "TWITCH", id: parsed.pathname.split("/")[1] };
    }

    // Kick
    if (parsed.hostname.includes("kick.com")) {
      return { platform: "KICK", id: parsed.pathname.split("/")[1] };
    }

    return null;
  } catch {
    return null;
  }
};
