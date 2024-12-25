import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";
import { RunData, StreakResult } from "../lib/interfaces";
import { getStreaks } from "../lib/utils";

interface StreakContextValue extends StreakResult {
  runs: RunData[];
  addRun: (newRun: RunData) => void;
}

const StreakContext = createContext<StreakContextValue | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [runs, setRuns] = useState<RunData[]>(data);
  const [streaks, setStreaks] = useState<StreakResult>(() => getStreaks(data));

  const addRun = (newRun: RunData) => {
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

  useEffect(() => {
    setStreaks(getStreaks(runs));
  }, [runs]);

  return (
    <StreakContext.Provider
      value={{
        runs,
        addRun,
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
