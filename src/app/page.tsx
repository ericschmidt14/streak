"use client";
import App from "./components/App";
import { StreakProvider } from "./context/StreakContext";

export default function Home() {
  return (
    <StreakProvider>
      <App />
    </StreakProvider>
  );
}
