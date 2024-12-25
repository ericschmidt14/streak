"use client";
import { Button, SegmentedControl } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { IconCalendar, IconCirclePlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useState } from "react";
import { useStreakContext } from "../context/StreakContext";

export default function Overlay() {
  const { addRun } = useStreakContext();
  const [date, setDate] = useState<Date | null>(new Date());
  const [effort, setEffort] = useState<string>("1");

  const handleAddRun = () => {
    if (date) {
      const newRun = {
        date: dayjs(date).format("YYYY-MM-DD"),
        distance: 0,
        effort: parseInt(effort, 10),
      };
      addRun(newRun);
    }
  };

  return (
    <DatesProvider settings={{ locale: "en" }}>
      <div className="fixed bottom-0 left-0 z-50 w-screen p-4 flex justify-center items-center gap-2 backdrop-blur-md bg-blue-900/10 shadow-md shadow-black/20">
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
            { label: "Moderate", value: "2" },
            { label: "Medium", value: "3" },
            { label: "Tough", value: "4" },
            { label: "Hard", value: "5" },
          ]}
          withItemsBorders={false}
        />
        <Button
          onClick={handleAddRun}
          rightSection={<IconCirclePlus size={16} />}
        >
          Add Run
        </Button>
      </div>
    </DatesProvider>
  );
}
