"use client";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import { IconPencil, IconUser, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import pluralize from "pluralize";
import { useEffect, useState } from "react";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  border,
  borderBottom,
  defaultPadding,
  defaultShadow,
  inputStyles,
} from "../lib/styles";

export default function Header() {
  const { user, longestStreak, currentStreak, updateDisplayName, signOut } =
    useStreakContext();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const name = user?.user_metadata.display_name;

  useEffect(() => {
    setDisplayName(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <header
        className={`sticky -top-20 z-50 w-full flex flex-col ${defaultShadow} ${backdropBlur} ${borderBottom}`}
      >
        <div className={`flex justify-between items-center ${defaultPadding}`}>
          <h1 className="font-medium text-lg leading-tight">
            {getGreeting()} {name}. <br /> It&apos;s a good day to go for a run.
          </h1>
          <ActionIcon
            size="xl"
            radius="xl"
            variant="light"
            color="blue"
            onClick={() => setOpen(true)}
            className={border}
          >
            <IconUser size={28} />
          </ActionIcon>
        </div>
        <div className={`flex justify-between items-center ${defaultPadding}`}>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <p className="text-xs text-white/50">Today</p>
              <p className="font-bold">
                {dayjs(new Date()).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <p className="text-xs text-white/50">Longest</p>
              <p className="font-bold text-blue-500">
                {longestStreak} {pluralize("day", longestStreak)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-white/50">Current</p>
              <p className="font-bold text-pink-500">
                {currentStreak} {pluralize("day", currentStreak)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 z-50 w-screen ${defaultPadding} grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 ${defaultShadow} ${backdropBlur} ${borderBottom} backdrop-blur-md`}
        style={{
          transform: open ? "translateY(0)" : "translateY(-200px)",
          transition: "300ms all ease-in-out",
        }}
      >
        <div className="flex items-center gap-2">
          <TextInput
            placeholder="New name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            leftSection={<IconUser size={16} />}
            styles={{
              input: inputStyles,
            }}
            className="w-full"
          />
          <ActionIcon
            variant="transparent"
            onClick={() => updateDisplayName(displayName)}
          >
            <IconPencil size={16} />
          </ActionIcon>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => signOut()} fullWidth>
            Sign Out
          </Button>
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => setOpen(false)}
          >
            <IconX size={16} />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}
