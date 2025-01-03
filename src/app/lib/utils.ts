import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { RunData, StreakResult } from "./interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStreaks(data: RunData[]): StreakResult {
  if (data.length === 0) {
    return {
      longestStreak: 0,
      currentStreak: 0,
      longestStreakDates: [],
      currentStreakDates: [],
    };
  }

  const sortedDates = data
    .map((entry) => dayjs(entry.date))
    .sort((a, b) => a.diff(b));

  let longestStreak = 0;
  let currentStreak = 0;
  let longestStreakDates: string[] = [];
  let currentStreakDates: string[] = [];

  let tempStreak = 1;
  let tempStreakDates: string[] = [sortedDates[0].format("YYYY-MM-DD")];

  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i - 1];

    if (currentDate.diff(previousDate, "day") === 1) {
      tempStreak++;
      tempStreakDates.push(currentDate.format("YYYY-MM-DD"));
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
        longestStreakDates = [...tempStreakDates];
      }
      tempStreak = 1;
      tempStreakDates = [currentDate.format("YYYY-MM-DD")];
    }
  }

  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
    longestStreakDates = [...tempStreakDates];
  }

  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  if (sortedDates.length > 0) {
    const lastRunDate = sortedDates[sortedDates.length - 1];

    if (
      lastRunDate.isSame(today, "day") ||
      lastRunDate.isSame(yesterday, "day")
    ) {
      currentStreak = 1;
      currentStreakDates = [lastRunDate.format("YYYY-MM-DD")];

      for (let i = sortedDates.length - 2; i >= 0; i--) {
        const currentDate = sortedDates[i];
        const nextDate = sortedDates[i + 1];

        if (nextDate.diff(currentDate, "day") === 1) {
          currentStreak++;
          currentStreakDates.push(currentDate.format("YYYY-MM-DD"));
        } else {
          break;
        }
      }

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

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
