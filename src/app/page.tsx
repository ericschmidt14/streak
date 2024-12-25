"use client";
import Overlay from "./components/Overlay";
import StreakView from "./components/StreakView";
import { StreakProvider } from "./context/StreakContext";

export default function Home() {
  return (
    <StreakProvider>
      <div className="flex flex-col items-center justify-items-center w-full min-h-screen p-2 md:p-8 font-[family-name:var(--font-geist-sans)]">
        <header className="w-full p-4">
          <h1 className="font-medium text-lg">
            Hi Eric, <br /> It&apos;s a good day to go for a run.
          </h1>
        </header>
        <StreakView />
        <Overlay />
      </div>
    </StreakProvider>
  );
}
