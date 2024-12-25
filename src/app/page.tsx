"use client";
import Header from "./components/Header";
import Overlay from "./components/Overlay";
import StreakView from "./components/StreakView";
import { StreakProvider } from "./context/StreakContext";

export default function Home() {
  return (
    <StreakProvider>
      <div className="flex flex-col items-center justify-items-center w-full min-h-screen p-2 md:p-8 font-[family-name:var(--font-geist-sans)]">
        <Header />
        <StreakView />
        <Overlay />
      </div>
    </StreakProvider>
  );
}
