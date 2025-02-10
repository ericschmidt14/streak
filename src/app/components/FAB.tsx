import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useStreakContext } from "../context/StreakContext";
import { hasRunToday } from "../lib/utils";

export default function FAB() {
  const { runs, selectRun } = useStreakContext();
  const today = dayjs().format("YYYY-MM-DD");

  return (
    !hasRunToday(runs) && (
      <ActionIcon
        size="xl"
        radius="xl"
        color="red.5"
        className="fixed bottom-12 lg:bottom-4 z-30 shadow-xl shadow-pink-500/20 cursor-pointer"
        onClick={() => selectRun({ date: today, effort: 1 })}
      >
        <IconPlus size={28} />
      </ActionIcon>
    )
  );
}
