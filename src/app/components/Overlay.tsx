"use client";
import { Button, SegmentedControl } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import {
  IconCalendar,
  IconCirclePlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect, useMemo, useState } from "react";
import { useStreakContext } from "../context/StreakContext";

export default function Overlay() {
  const { runs, selectedRun, addRun, removeRun } = useStreakContext();
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
      <div className="fixed bottom-0 left-0 z-50 w-screen p-4 flex justify-center items-center gap-2 backdrop-blur-md bg-black/20 border-t border-t-white/10">
        <DatePickerInput
          value={date}
          onChange={setDate}
          valueFormat="DD MMM YYYY"
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
        <Button
          color="orange"
          variant="light"
          onClick={() =>
            addRun({
              date: dayjs(date).format("YYYY-MM-DD"),
              distance: 0,
              effort: parseInt(effort, 10),
            })
          }
          leftSection={
            runForSelectedDate ? (
              <IconPencil size={16} />
            ) : (
              <IconCirclePlus size={16} />
            )
          }
        >
          {runForSelectedDate ? "Update" : "Add"} Run
        </Button>
        {runForSelectedDate && selectedRun && (
          <Button
            variant="transparent"
            onClick={() => removeRun(selectedRun.date)}
            leftSection={<IconTrash size={16} />}
          >
            Delete
          </Button>
        )}
      </div>
    </DatesProvider>
  );
}
