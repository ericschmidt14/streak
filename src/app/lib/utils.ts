import dayjs from "dayjs";
import { RunData, StreakResult } from "./interfaces";

export function getStreaks(data: RunData[]): StreakResult {
  // Parse and sort dates in ascending order
  const sortedDates = data
    .map((entry) => dayjs(entry.date))
    .sort((a, b) => a.diff(b));

  let longestStreak = 0;
  let currentStreak = 0;
  let longestStreakDates: string[] = [];
  let currentStreakDates: string[] = [];

  let tempStreak = 1;
  let tempStreakDates: string[] = [sortedDates[0].format("YYYY-MM-DD")];

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i - 1];

    if (currentDate.diff(previousDate, "day") === 1) {
      tempStreak++;
      tempStreakDates.push(currentDate.format("YYYY-MM-DD"));
    } else {
      // Streak broke, check if this was the longest streak
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakDates = [...tempStreakDates];
      }
      // Reset temp streak
      tempStreak = 1;
      tempStreakDates = [currentDate.format("YYYY-MM-DD")];
    }
  }

  // Final check for the longest streak after the loop
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
    longestStreakDates = [...tempStreakDates];
  }

  // Calculate current streak
  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  if (sortedDates.length > 0) {
    const lastRunDate = sortedDates[sortedDates.length - 1];

    // If the most recent run is today, or yesterday, calculate streak
    if (
      lastRunDate.isSame(today, "day") ||
      lastRunDate.isSame(yesterday, "day")
    ) {
      currentStreak = 1;
      currentStreakDates = [lastRunDate.format("YYYY-MM-DD")];

      // Walk backward through the dates to find consecutive days
      for (let i = sortedDates.length - 2; i >= 0; i--) {
        const currentDate = sortedDates[i];
        const nextDate = sortedDates[i + 1];

        if (nextDate.diff(currentDate, "day") === 1) {
          currentStreak++;
          currentStreakDates.push(currentDate.format("YYYY-MM-DD"));
        } else {
          break; // Stop if the streak is broken
        }
      }

      // Include today in the streak if it is a run day
      if (lastRunDate.isSame(today, "day")) {
        currentStreakDates.push(today.format("YYYY-MM-DD"));
      }
    }
  }

  return {
    longestStreak,
    currentStreak,
    longestStreakDates,
    currentStreakDates,
  };
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
