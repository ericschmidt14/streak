"use client";
import Overlay from "./components/Overlay";
import StreakView from "./components/StreakView";
import { StreakProvider } from "./context/StreakContext";

export default function Home() {
  return (
    <StreakProvider>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <StreakView />
        <Overlay />
      </div>
    </StreakProvider>
  );
}
