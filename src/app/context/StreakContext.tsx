import { AuthError, createClient, User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { RunData, StreakResult, UserData } from "../lib/interfaces";
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
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserDetails: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  user: User | null;
  error: AuthError | null;
  loading: boolean;
}

const StreakContext = createContext<StreakContextValue | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<RunData[]>([]);
  const [streaks, setStreaks] = useState<StreakResult>({
    longestStreak: 0,
    currentStreak: 0,
    longestStreakDates: [],
    currentStreakDates: [],
  });
  const [selectedRun, setSelectedRun] = useState<RunData | null>(null);

  useEffect(() => {
    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setStreaks(getStreaks(runs));
  }, [runs]);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    setUser(data.user);
    setError(error);
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data.user);
    setError(error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setError(error);
  };

  const updateUserDetails = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    const updateData: UserData = {
      data: {
        display_name: displayName,
      },
    };

    if (email !== "") {
      updateData.email = email;
    }

    if (password !== "") {
      updateData.password = password;
    }

    const { error } = await supabase.auth.updateUser(updateData);
    setError(error);
  };

  const fetchUser = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session) {
      setUser(session.user);
      const { data: userDetails } = await supabase.auth.getUser();
      if (userDetails.user?.user_metadata?.display_name) {
        console.log(`Welcome, ${userDetails.user.user_metadata.display_name}`);
      }
    } else {
      setUser(null);
    }

    if (error) {
      console.error("Error fetching session:", error.message);
    }
    setLoading(false);
  };

  const fetchRuns = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("Streak")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching runs:", error.message);
      } else if (data) {
        setRuns(data.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))));
      }
    }
  };

  const addRun = async (newRun: RunData) => {
    if (!user) {
      console.error("Cannot add run: User is not authenticated.");
      return;
    }

    const runWithUserId = { ...newRun, user_id: user.id };
    const existingRun = runs.find((run) => run.date === newRun.date);

    if (existingRun) {
      const { error } = await supabase
        .from("Streak")
        .update(runWithUserId)
        .eq("date", newRun.date)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating run:", error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("Streak").insert([runWithUserId]);

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
        signUp,
        signIn,
        signOut,
        updateUserDetails,
        user,
        error,
        loading,
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
