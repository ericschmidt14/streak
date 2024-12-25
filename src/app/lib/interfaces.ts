export interface RunData {
  date: string;
  distance: number;
  effort: number;
}

export interface StreakResult {
  longestStreak: number;
  currentStreak: number;
  longestStreakDates: string[];
  currentStreakDates: string[];
}
