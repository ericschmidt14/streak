import dayjs from "dayjs";
import Image from "next/image";
import pluralize from "pluralize";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  borderBottom,
  defaultPadding,
  defaultShadow,
} from "../lib/styles";

export default function Header() {
  const { longestStreak, currentStreak } = useStreakContext();

  return (
    <header
      className={`sticky -top-20 z-50 w-full flex flex-col ${defaultShadow} ${backdropBlur} ${borderBottom}`}
    >
      <div className={`flex justify-between items-center ${defaultPadding}`}>
        <h1 className="font-medium text-lg leading-tight">
          Hi Eric, <br /> It&apos;s a good day to go for a run.
        </h1>
        <Image
          src="/profile.jpeg"
          alt="Profile Image"
          width={48}
          height={48}
          className="rounded-full"
        />
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
        <div className="flex gap-8">
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
  );
}
