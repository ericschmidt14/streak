import dayjs from "dayjs";
import pluralize from "pluralize";
import { useStreakContext } from "../context/StreakContext";
import Year from "./Year";

export default function StreakView() {
  const { longestStreak, currentStreak } = useStreakContext();
  const years = [2024, 2025];

  return (
    <div className="w-full flex flex-col gap-2">
      <header className="flex justify-between items-center p-4 border-b border-b-white/10">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <p className="text-xs text-white/50">Today</p>
            <p className="font-bold">
              {dayjs(new Date()).format("DD MMMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col items-end">
            <p className="text-xs text-white/50">Longest streak</p>
            <p className="font-bold text-blue-500">
              {longestStreak} {pluralize("day", longestStreak)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs text-white/50">Current streak</p>
            <p className="font-bold text-pink-500">
              {currentStreak} {pluralize("day", currentStreak)}
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8">
        {years.map((y) => (
          <Year key={y} year={y} />
        ))}
      </main>
    </div>
  );
}
