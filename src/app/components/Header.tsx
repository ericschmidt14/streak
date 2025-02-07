"use client";
import { ActionIcon } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import pluralize from "pluralize";
import { useState } from "react";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  border,
  borderBottom,
  defaultPadding,
  defaultShadow,
} from "../lib/styles";
import { hasRunToday } from "../lib/utils";
import Info from "./Info";
import Settings from "./Settings";

export default function Header() {
  const { runs, user, longestStreak, currentStreak } = useStreakContext();
  const [open, setOpen] = useState(false);

  const name = user?.user_metadata.display_name;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 6) {
      return "Good early morning,";
    } else if (currentHour >= 6 && currentHour < 10) {
      return "Good morning,";
    } else if (currentHour >= 10 && currentHour < 11) {
      return "Morning,";
    } else if (currentHour >= 11 && currentHour < 13) {
      return "Hi";
    } else if (currentHour >= 13 && currentHour < 17) {
      return "Good afternoon,";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good evening,";
    } else {
      return "Good night,";
    }
  };

  const getMessage = () => {
    if (hasRunToday(runs)) {
      return "Job done. See you tomorrow!";
    } else {
      return "It's a good day to go for a run.";
    }
  };

  return (
    <>
      <header
        className={`sticky -top-20 z-50 w-full flex flex-col ${defaultShadow} ${backdropBlur} ${borderBottom}`}
      >
        <div className={`flex justify-between items-center ${defaultPadding}`}>
          <h1 className="font-medium text-lg leading-tight">
            {getGreeting()} {name}. <br /> {getMessage()}
          </h1>
          <ActionIcon
            size="xl"
            radius="xl"
            variant="gradient"
            gradient={{ from: "red", to: "blue", deg: 75 }}
            onClick={() => setOpen(true)}
            className={border}
          >
            <IconUser size={28} />
          </ActionIcon>
        </div>
        <div className={`flex justify-between items-center ${defaultPadding}`}>
          <Info
            label="Today"
            value={dayjs(new Date()).format("DD MMMM YYYY")}
            color="foreground"
          />
          <div className="flex gap-4">
            <Info
              label="Longest"
              value={`${longestStreak} ${pluralize("day", longestStreak)}`}
              color="blue"
              alignRight
            />
            <Info
              label="Current"
              value={`${currentStreak} ${pluralize("day", currentStreak)}`}
              color="red"
              alignRight
            />
          </div>
        </div>
      </header>
      <Settings open={open} setOpen={setOpen} />
    </>
  );
}
