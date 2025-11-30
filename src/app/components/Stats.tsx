import { BarChart, CompositeChart } from "@mantine/charts";
import { Table } from "@mantine/core";
import dayjs from "dayjs";
import pluralize from "pluralize";
import { RunData } from "../lib/interfaces";
import { calculateYearLongestStreak, isLeapYear } from "../lib/utils";

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
      <div className="flex flex-col">
        <h3 className="text-lg">Statistics</h3>
        <Table variant="vertical">
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>Total Runs</Table.Th>
              <Table.Td>
                <p>
                  {stats.totalRuns} out of {stats.daysInYear} days{" "}
                  <span className="text-white/50">– {runPercentage}%</span>
                </p>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Longest Streak</Table.Th>
              <Table.Td>
                {stats.longestStreakOfYear}{" "}
                {pluralize("day", stats.longestStreakOfYear)}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Easy Runs</Table.Th>
              <Table.Td>
                <p style={{ color: "var(--mantine-color-blue-5)" }}>
                  {stats.easyRuns}
                </p>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Moderate Runs</Table.Th>
              <Table.Td>
                <p style={{ color: "var(--mantine-color-orange-5)" }}>
                  {stats.moderateRuns}
                </p>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Hard Runs</Table.Th>
              <Table.Td>
                <p style={{ color: "var(--mantine-color-red-5)" }}>
                  {stats.hardRuns}
                </p>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <BarChart
          h={72}
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
        <CompositeChart
          h={240}
          data={stats.monthlyEffort}
          dataKey="month"
          series={[
            {
              type: "bar",
              name: "effort",
              label: "Combined Effort",
              color: "blue.5",
            },
            {
              type: "line",
              name: "runs",
              label: "Runs",
              color: "red.5",
            },
          ]}
          curveType="linear"
          strokeWidth={2}
          withDots={false}
          withTooltip={false}
          withYAxis={false}
          xAxisProps={{
            tickFormatter: (value) => value.substring(0, 1),
          }}
          gridAxis="none"
        />
      </div>
    </div>
  );
}
