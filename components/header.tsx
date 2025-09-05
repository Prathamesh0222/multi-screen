import { ModeToggle } from "@/components/mode-toggle";

export const Header = () => {
  return (
    <div className="border-b w-full">
      <div className="flex justify-between p-5 items-center max-w-4xl mx-auto border-x">
        <h1 className="text-lg font-bold">MultiScreen</h1>
        <ModeToggle />
      </div>
    </div>
  );
};
