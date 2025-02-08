import { useStreakContext } from "../context/StreakContext";
import { isLeapYear } from "../lib/utils";
import Day from "./Day";

export default function Month({
  name,
  index,
  year,
}: {
  name: string;
  index: number;
  year: number;
}) {
  const { calendarView, runs, longestStreakDates, currentStreakDates } =
    useStreakContext();

  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const monthData = runs.filter((d) => {
    const date = new Date(d.date);
    return date.getFullYear() === year && date.getMonth() === index;
  });

  const daysData = Array.from({ length: days[index] }).map((_, dayIndex) => {
    const date = `${year}-${String(index + 1).padStart(2, "0")}-${String(
      dayIndex + 1
    ).padStart(2, "0")}`;

    const isInLongestStreak = longestStreakDates.includes(date);
    const isInCurrentStreak = currentStreakDates.includes(date);

    const today = new Date();
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === index &&
      today.getDate() === dayIndex + 1;

    return (
      <Day
        key={dayIndex}
        date={date}
        effort={
          monthData.find((d) => new Date(d.date).getDate() === dayIndex + 1)
            ?.effort
        }
        isInLongestStreak={isInLongestStreak}
        isInCurrentStreak={isInCurrentStreak}
        isToday={isToday}
      />
    );
  });

  const firstDayOfMonth = new Date(
    `${year}-${String(index + 1).padStart(2, "0")}-${String(1).padStart(
      2,
      "0"
    )}`
  ).getDay();

  return calendarView ? (
    <div>
      <h3 className="text-sm text-white/50 py-2">{name}</h3>
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDayOfMonth - 1 }).map((_, dayIndex) => (
          <div key={dayIndex} />
        ))}
        {daysData}
      </div>
    </div>
  ) : (
    <div className="grid gap-2 grid-cols-1 grid-rows-[repeat(32,1fr)] lg:grid-cols-[repeat(32,1fr)] lg:grid-rows-1">
      <div className="aspect-square max-w-8 max-h-8 flex items-center justify-center text-xs text-white/50">
        {name.substring(0, 1)}
      </div>
      {daysData}
    </div>
  );
}
