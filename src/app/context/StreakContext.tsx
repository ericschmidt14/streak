import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { RunData, StreakResult } from "../lib/interfaces";
import { getStreaks } from "../lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface StreakContextValue extends StreakResult {
  runs: RunData[];
  selectedRun: RunData | null;
  addRun: (newRun: RunData) => Promise<void>;
  removeRun: (date: string) => Promise<void>;
  selectRun: (run: RunData | null) => void;
}

const StreakContext = createContext<StreakContextValue | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [runs, setRuns] = useState<RunData[]>([]);
  const [streaks, setStreaks] = useState<StreakResult>({
    longestStreak: 0,
    longestStreakDates: [],
    currentStreak: 0,
    currentStreakDates: [],
  });
  const [selectedRun, setSelectedRun] = useState<RunData | null>(null);

  useEffect(() => {
    const fetchRuns = async () => {
      const { data, error } = await supabase.from("Streak").select("*");

      if (error) {
        console.error("Error fetching runs:", error.message);
      } else if (data) {
        setRuns(data.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))));
      }
    };

    fetchRuns();
  }, []);

  useEffect(() => {
    setStreaks(getStreaks(runs));
  }, [runs]);

  const addRun = async (newRun: RunData) => {
    const existingRun = runs.find((run) => run.date === newRun.date);

    if (existingRun) {
      const { error } = await supabase
        .from("Streak")
        .update(newRun)
        .eq("date", newRun.date);

      if (error) {
        console.error("Error updating run:", error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("Streak").insert([newRun]);

      if (error) {
        console.error("Error adding new run:", error.message);
        return;
      }
    }

    setRuns((prevRuns) => {
      const updatedRuns = prevRuns.map((run) =>
        run.date === newRun.date ? { ...run, ...newRun } : run
      );

      if (!prevRuns.some((run) => run.date === newRun.date)) {
        updatedRuns.push(newRun);
      }

      return updatedRuns.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    });
  };

  const removeRun = async (date: string) => {
    const { error } = await supabase.from("Streak").delete().eq("date", date);

    if (error) {
      console.error("Error removing run:", error.message);
      return;
    }

    setRuns((prevRuns) => prevRuns.filter((run) => run.date !== date));
    setSelectedRun(null);
  };

  const selectRun = (run: RunData | null) => {
    setSelectedRun(run);
  };

  return (
    <StreakContext.Provider
      value={{
        runs,
        addRun,
        removeRun,
        selectRun,
        selectedRun,
        longestStreak: streaks.longestStreak,
        longestStreakDates: streaks.longestStreakDates,
        currentStreak: streaks.currentStreak,
        currentStreakDates: streaks.currentStreakDates,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
};

export const useStreakContext = (): StreakContextValue => {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreakContext must be used within a StreakProvider");
  }
  return context;
};
