import { Sparkline } from "@mantine/charts";
import { useStreakContext } from "../context/StreakContext";
import { getHistory } from "../lib/utils";
import Month from "./Month";

export default function Year({ year }: { year: number }) {
  const { runs } = useStreakContext();

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
  const efforts = getHistory(runs);

  return (
    <div className="flex flex-col gap-2">
      <header className="flex justify-between items-end gap-2">
        <h2 className="text-4xl font-bold tracking-tighter">{year}</h2>
        <Sparkline
          curveType="linear"
          trendColors={{ positive: "blue", negative: "red" }}
          data={efforts}
          fillOpacity={0.6}
          strokeWidth={2}
          w={180}
          h={36}
        />
      </header>
      <div className="grid grid-cols-[repeat(13,1fr)] lg:grid-cols-1">
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
        {months.map((m, index) => (
          <Month key={index} name={m} index={index} year={year} />
        ))}
      </div>
    </div>
  );
}
