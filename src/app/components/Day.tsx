export default function Day({
  effort,
  isInLongestStreak,
  isInCurrentStreak,
  isToday,
}: {
  effort?: number;
  isInLongestStreak?: boolean;
  isInCurrentStreak?: boolean;
  isToday?: boolean;
}) {
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
    <div className="w-8 h-8 flex items-center justify-center">
      <div
        className={`rounded-full ${isToday ? "ring-1 ring-white" : ""}`}
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
          background: bg,
        }}
      />
    </div>
  );
}
