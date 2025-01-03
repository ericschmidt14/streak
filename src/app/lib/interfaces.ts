export interface RunData {
  date: string;
  effort: number;
  user_id?: string;
}

export interface StreakResult {
  longestStreak: number;
  currentStreak: number;
  longestStreakDates: string[];
  currentStreakDates: string[];
}
