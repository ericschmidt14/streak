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
  const size = effort ? effort : 1;
  const bg =
    isInCurrentStreak && isInLongestStreak
      ? "linear-gradient(75deg, #ec4899 0%, #2563eb 100%)"
      : isInCurrentStreak
      ? "#ec4899"
      : isInLongestStreak
      ? "#2563eb"
      : effort
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 0.1)";

  return (
    <div
      className="aspect-square max-w-8 max-h-8 flex items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-80"
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
          isSelected ? "ring-2 ring-orange-500 shadow-xl shadow-orange-500" : ""
        } ${
          isToday && !isSelected
            ? "ring-2 ring-white shadow-xl shadow-white"
            : ""
        } `}
        style={{
          width: `${size * 5}px`,
          height: `${size * 5}px`,
          background: bg,
        }}
      />
    </div>
  );
}
