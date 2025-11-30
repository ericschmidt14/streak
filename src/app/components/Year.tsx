import { Sparkline } from "@mantine/charts";
import { ActionIcon, SegmentedControl } from "@mantine/core";
import {
  IconChartLine,
  IconChevronLeft,
  IconChevronRight,
  IconGripVertical,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { useState } from "react";
import { VIEW_STORAGE_KEY } from "../config";
import { useStreakContext } from "../context/StreakContext";
import { segmentedControl } from "../lib/styles";
import Month from "./Month";
import Stats from "./Stats";

export default function Year({
  year,
  minYear,
  maxYear,
  onYearChange,
}: {
  year: number;
  minYear?: number;
  maxYear?: number;
  onYearChange?: (year: number) => void;
}) {
  const { streakHistory, calendarView, setCalendarView, runs } =
    useStreakContext();
  const [viewMode, setViewMode] = useState<"grid" | "calendar" | "stats">(
    calendarView ? "calendar" : "grid"
  );

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

  const handlePrevYear = () => {
    if (minYear && year > minYear && onYearChange) {
      onYearChange(year - 1);
    }
  };

  const handleNextYear = () => {
    if (maxYear && year < maxYear && onYearChange) {
      onYearChange(year + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Sparkline
        curveType="linear"
        color="red.5"
        data={streakHistory}
        strokeWidth={2}
        fillOpacity={0}
        h={44}
      />
      <header className="flex justify-between items-end gap-4">
        <div className="flex items-center gap-4">
          {minYear !== undefined && onYearChange && (
            <ActionIcon
              onClick={handlePrevYear}
              disabled={year <= minYear}
              variant="light"
              color="orange"
              size="lg"
            >
              <IconChevronLeft size={24} />
            </ActionIcon>
          )}
          <h2 className="text-4xl font-bold tracking-tighter">{year}</h2>
          {maxYear !== undefined && onYearChange && (
            <ActionIcon
              onClick={handleNextYear}
              disabled={year >= maxYear}
              variant="light"
              color="orange"
              size="lg"
            >
              <IconChevronRight size={24} />
            </ActionIcon>
          )}
        </div>
        <SegmentedControl
          data={[
            {
              value: "grid",
              label: <IconGripVertical size={20} />,
            },
            {
              value: "calendar",
              label: <IconLayoutGrid size={20} />,
            },
            {
              value: "stats",
              label: <IconChartLine size={20} />,
            },
          ]}
          value={viewMode}
          onChange={(e) => {
            const mode = e as "grid" | "calendar" | "stats";
            setViewMode(mode);
            if (mode !== "stats") {
              setCalendarView(mode === "calendar");
              localStorage.setItem(VIEW_STORAGE_KEY, mode);
            }
          }}
          styles={segmentedControl}
        />
      </header>

      {viewMode === "stats" ? (
        <Stats year={year} runs={runs} />
      ) : (
        <div
          className={
            viewMode === "calendar"
              ? "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              : "grid grid-cols-[repeat(13,1fr)] lg:grid-cols-1"
          }
        >
          {viewMode !== "calendar" && (
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
      )}
    </div>
  );
}
