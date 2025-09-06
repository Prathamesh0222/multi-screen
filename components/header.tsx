import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="border-b w-full">
      <div className="flex justify-between p-5 items-center max-w-4xl mx-auto border-x">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="MultiScreen" width={32} height={32} />
          <h1 className="font-semibold text-lg">MultiScreen</h1>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
