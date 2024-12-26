"use client";
import { ActionIcon, Button, SegmentedControl } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import {
  IconCalendar,
  IconCirclePlus,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect, useMemo, useState } from "react";
import { useStreakContext } from "../context/StreakContext";

export default function Overlay() {
  const { runs, selectedRun, selectRun, addRun, removeRun } =
    useStreakContext();
  const [date, setDate] = useState<Date | null>(new Date());
  const [effort, setEffort] = useState<string>("1");

  const runForSelectedDate = useMemo(() => {
    if (!date) return null;
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return runs.find((run) => run.date === formattedDate) || null;
  }, [date, runs]);

  useEffect(() => {
    if (selectedRun) {
      setDate(new Date(selectedRun.date));
      setEffort(selectedRun.effort.toString());
    }
  }, [selectedRun]);

  return (
    <DatesProvider settings={{ locale: "en" }}>
      <div
        className="fixed bottom-0 left-0 z-50 w-screen p-4 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2 backdrop-blur-md bg-black/20 border-t border-t-white/10"
        style={{
          transform: selectedRun ? "translateY(0)" : "translateY(200px)",
          transition: "300ms all ease-in-out",
        }}
      >
        <DatePickerInput
          value={date}
          onChange={setDate}
          valueFormat="DD MMMM YYYY"
          defaultValue={new Date()}
          leftSection={<IconCalendar size={16} />}
        />
        <SegmentedControl
          value={effort}
          onChange={setEffort}
          data={[
            { label: "Easy", value: "1" },
            { label: "Moderate", value: "3" },
            { label: "Hard", value: "5" },
          ]}
          withItemsBorders={false}
        />
        <div className="flex items-center gap-2">
          <Button
            color="orange"
            variant="light"
            onClick={() => {
              addRun({
                date: dayjs(date).format("YYYY-MM-DD"),
                distance: 0,
                effort: parseInt(effort, 10),
              });
              selectRun(null);
            }}
            leftSection={
              runForSelectedDate ? (
                <IconPencil size={16} />
              ) : (
                <IconCirclePlus size={16} />
              )
            }
            fullWidth
          >
            {runForSelectedDate ? "Update" : "Add"} Run
          </Button>
          {runForSelectedDate && selectedRun && (
            <Button
              variant="transparent"
              onClick={() => removeRun(selectedRun.date)}
              leftSection={<IconTrash size={16} />}
              fullWidth
            >
              Delete
            </Button>
          )}
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => selectRun(null)}
          >
            <IconX size={16} />
          </ActionIcon>
        </div>
      </div>
    </DatesProvider>
  );
}
