export interface RunData {
  date: string;
  effort: number;
}

export interface StreakResult {
  longestStreak: number;
  currentStreak: number;
  longestStreakDates: string[];
  currentStreakDates: string[];
}
