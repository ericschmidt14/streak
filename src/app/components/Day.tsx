import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
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
  const { selectedRun, selectRun, calendarView } = useStreakContext();

  const isSelected = selectedRun?.date === date;
  const size = `${(effort ? effort + 1 : 1) * (calendarView ? 2.4 : 4)}px`;
  const bg =
    isInCurrentStreak && isInLongestStreak
      ? "linear-gradient(75deg, var(--red) 0%, var(--blue) 100%)"
      : isInCurrentStreak
      ? "var(--red)"
      : isInLongestStreak
      ? "var(--blue)"
      : effort
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 0.1)";

  dayjs.extend(isSameOrBefore);
  const isPastOrToday = dayjs(date).isSameOrBefore(dayjs(), "day");

  return (
    <div
      className={`aspect-square max-w-8 max-h-8 flex items-center justify-center transition-all duration-300 hover:opacity-80 ${
        isPastOrToday && "cursor-pointer"
      }`}
      onClick={() =>
        isPastOrToday
          ? selectRun(effort ? { date, effort } : { date, effort: 1 })
          : undefined
      }
    >
      <div
        className={`rounded-full ${
          isSelected && "ring-2 ring-orange-500 shadow-xl shadow-orange-500"
        } ${isToday && "border border-white shadow-xl shadow-white"} `}
        style={{
          width: size,
          height: size,
          background: bg,
        }}
      />
    </div>
  );
}
