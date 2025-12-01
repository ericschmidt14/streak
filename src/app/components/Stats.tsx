import { BarChart } from "@mantine/charts";
import dayjs from "dayjs";
import pluralize from "pluralize";
import { RunData } from "../lib/interfaces";
import { calculateYearLongestStreak, isLeapYear } from "../lib/utils";
import Info from "./Info";

interface YearStats {
  totalRuns: number;
  easyRuns: number;
  moderateRuns: number;
  hardRuns: number;
  daysWithoutRuns: number;
  daysInYear: number;
  longestStreakOfYear: number;
  monthlyEffort: Array<{ month: string; effort: number; runs: number }>;
  runDistribution: Array<{
    name: string;
    Easy: number;
    Moderate: number;
    Hard: number;
    "No Runs": number;
  }>;
}

function calculateYearStats(runs: RunData[], year: number): YearStats {
  const daysInYear = isLeapYear(year) ? 366 : 365;

  const yearRuns = runs.filter((run) => dayjs(run.date).year() === year);

  const totalRuns = yearRuns.length;
  const easyRuns = yearRuns.filter((run) => run.effort === 1).length;
  const moderateRuns = yearRuns.filter((run) => run.effort === 3).length;
  const hardRuns = yearRuns.filter((run) => run.effort >= 5).length;

  const monthlyEffort = Array.from({ length: 12 }).map((_, monthIndex) => {
    const monthName = dayjs().month(monthIndex).format("MMMM");
    const monthRuns = yearRuns.filter(
      (run) => dayjs(run.date).month() === monthIndex
    );
    const effort = monthRuns.reduce((sum, run) => sum + run.effort, 0);
    const runsCount = monthRuns.length;
    return { month: monthName, effort, runs: runsCount };
  });

  const longestStreakOfYear = calculateYearLongestStreak(runs, year);

  const daysWithoutRuns = daysInYear - totalRuns;

  const runDistribution = [
    {
      name: "Distribution",
      Easy: easyRuns,
      Moderate: moderateRuns,
      Hard: hardRuns,
      "No Runs": daysWithoutRuns,
    },
  ];

  return {
    totalRuns,
    easyRuns,
    moderateRuns,
    hardRuns,
    daysWithoutRuns,
    daysInYear,
    longestStreakOfYear,
    monthlyEffort,
    runDistribution,
  };
}

export default function Stats({
  year,
  runs,
}: {
  year: number;
  runs: RunData[];
}) {
  const stats = calculateYearStats(runs, year);

  const runPercentage = Math.round((stats.totalRuns / stats.daysInYear) * 100);

  return (
    <div className="flex flex-col gap-16 py-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Info
              label="Easy Runs"
              value={String(stats.easyRuns)}
              color={"mantine-color-blue-5"}
            />
            <Info
              label="Moderate Runs"
              value={String(stats.moderateRuns)}
              color={"mantine-color-orange-5"}
            />
            <Info
              label="Hard Runs"
              value={String(stats.hardRuns)}
              color={"mantine-color-red-5"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Info
              label="Total Runs"
              value={`${stats.totalRuns} / ${stats.daysInYear} (${runPercentage}%)`}
              color="white"
              alignRight
            />
            <Info
              label="Longest Streak"
              value={`${stats.longestStreakOfYear} ${pluralize(
                "day",
                stats.longestStreakOfYear
              )}`}
              color="white"
              alignRight
            />
          </div>
        </div>
        <BarChart
          h={4}
          data={stats.runDistribution}
          type="percent"
          dataKey="name"
          series={[
            { name: "Easy", label: "Easy", color: "blue.5" },
            { name: "Moderate", label: "Moderate", color: "orange.5" },
            { name: "Hard", label: "Hard", color: "red.5" },
            { name: "No Runs", label: "No Runs", color: "dark.7" },
          ]}
          orientation="vertical"
          gridAxis="none"
          withTooltip={false}
          withYAxis={false}
          withXAxis={false}
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-lg">Monthly Effort</h3>
        <BarChart
          h={240}
          data={stats.monthlyEffort}
          dataKey="month"
          series={[
            { name: "effort", label: "Combined Effort", color: "blue.5" },
          ]}
          maxBarWidth={4}
          withYAxis={false}
          withTooltip={false}
          gridAxis="none"
          xAxisProps={{
            tickFormatter: (value: string) =>
              value ? value.substring(0, 1) : value,
          }}
        />
      </div>
    </div>
  );
}
