import { useStreakContext } from "../context/StreakContext";

export default function Day({
  date,
  effort,
  isInLongestStreak,
  isInCurrentStreak,
  isToday,
}: {
  date: string;
  effort?: number;
  isInLongestStreak?: boolean;
  isInCurrentStreak?: boolean;
  isToday?: boolean;
}) {
  const { selectedRun, selectRun } = useStreakContext();

  const isSelected = selectedRun?.date === date;
  const size = effort ? 2 + effort : 2;
  const bg =
    isInCurrentStreak && isInLongestStreak
      ? "linear-gradient(75deg, #ec4899 0%, #2563eb 100%)"
      : isInCurrentStreak
      ? "#ec4899"
      : isInLongestStreak
      ? "#2563eb"
      : isToday
      ? "#be185d"
      : effort
      ? "rgba(255, 255, 255, 1)"
      : "#0f172a";

  return (
    <div
      className="w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-80"
      onClick={() =>
        selectRun(
          effort
            ? { date, effort, distance: 0 }
            : { date, effort: 1, distance: 0 }
        )
      }
    >
      <div
        className={`rounded-full ${
          isToday ? "ring-2 ring-white shadow-xl shadow-white" : ""
        } ${
          isSelected ? "ring-2 ring-cyan-500 shadow-xl shadow-cyan-500" : ""
        }`}
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
          background: bg,
        }}
      />
    </div>
  );
}
