import { Sparkline } from "@mantine/charts";
import { SegmentedControl } from "@mantine/core";
import { IconCalendarWeek, IconGridDots } from "@tabler/icons-react";
import { VIEW_STORAGE_KEY } from "../config";
import { useStreakContext } from "../context/StreakContext";
import { segmentedControl } from "../lib/styles";
import Month from "./Month";

export default function Year({ year }: { year: number }) {
  const { streakHistory, calendarView, setCalendarView } = useStreakContext();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex justify-between items-end gap-4">
        <h2 className="text-4xl font-bold tracking-tighter">{year}</h2>
        <SegmentedControl
          data={[
            {
              value: "grid",
              label: <IconGridDots size={20} />,
            },
            {
              value: "calendar",
              label: <IconCalendarWeek size={20} />,
            },
          ]}
          defaultValue={calendarView ? "calendar" : "grid"}
          onChange={(e) => {
            setCalendarView(e === "calendar");
            localStorage.setItem(VIEW_STORAGE_KEY, e);
          }}
          styles={segmentedControl}
        />
      </header>
      <Sparkline
        curveType="monotone"
        color="red.5"
        data={streakHistory}
        fillOpacity={0.6}
        strokeWidth={2}
        h={44}
      />
      <div
        className={
          calendarView
            ? "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            : "grid grid-cols-[repeat(13,1fr)] lg:grid-cols-1"
        }
      >
        {!calendarView && (
          <div className="grid gap-2 grid-cols-1 grid-rows-[repeat(32,1fr)] lg:grid-cols-[repeat(32,1fr)] lg:grid-rows-1">
            <div className="aspect-square max-w-8 max-h-8" />
            {Array.from({ length: 31 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square max-w-8 max-h-8 flex items-center justify-center text-xs text-white/50"
              >
                {index + 1}
              </div>
            ))}
          </div>
        )}
        {months.map((m, index) => (
          <Month key={index} name={m} index={index} year={year} />
        ))}
      </div>
    </div>
  );
}
