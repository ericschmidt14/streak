"use client";
import { ActionIcon, Button, SegmentedControl } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import {
  IconCalendar,
  IconCirclePlus,
  IconInfoCircle,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect, useMemo, useState } from "react";
import { useStreakContext } from "../context/StreakContext";
import { disclaimer, effortLevels } from "../lib/data";
import {
  backdropBlur,
  border,
  borderTop,
  defaultPadding,
  defaultShadow,
  inputStyles,
  segmentedControl,
} from "../lib/styles";

export default function Overlay() {
  const { runs, selectedRun, selectRun, addRun, removeRun } =
    useStreakContext();
  const [date, setDate] = useState<string | Date | null>(new Date());
  const [effort, setEffort] = useState<string>("1");
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

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
        className={`fixed bottom-0 left-0 z-40 w-screen ${defaultPadding} pb-12 lg:pb-4 grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-2 ${defaultShadow} ${backdropBlur} ${borderTop}`}
        style={{
          transform: selectedRun ? "translateY(0)" : "translateY(240px)",
          transition: "300ms all ease-in-out",
        }}
      >
        {confirm ? (
          <>
            <p className="p-2 text-center text-lg">Are you sure?</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="lg"
                variant="light"
                leftSection={<IconTrash size={20} />}
                onClick={() => {
                  removeRun(selectedRun!.date);
                  setTimeout(() => setConfirm(false), 400);
                }}
              >
                Yes
              </Button>
              <Button
                size="lg"
                variant="transparent"
                color="blue"
                leftSection={<IconX size={20} />}
                onClick={() => setConfirm(false)}
              >
                No
              </Button>
            </div>
          </>
        ) : (
          <>
            <DatePickerInput
              size="lg"
              value={date}
              onChange={setDate}
              valueFormat="dddd, DD MMMM YYYY"
              defaultValue={new Date()}
              rightSection={<IconCalendar size={20} />}
              styles={{
                input: inputStyles,
              }}
              readOnly
            />
            <div className="flex items-center gap-2 pr-2">
              <SegmentedControl
                size="lg"
                value={effort}
                onChange={setEffort}
                data={[
                  { label: "Easy", value: "1" },
                  { label: "Moderate", value: "3" },
                  { label: "Hard", value: "5" },
                ]}
                withItemsBorders={false}
                className="w-full"
                styles={segmentedControl}
                fullWidth
              />
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => setOpen(true)}
              >
                <IconInfoCircle size={20} />
              </ActionIcon>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <Button
                size="lg"
                color="orange"
                variant="light"
                onClick={() => {
                  addRun({
                    date: dayjs(date).format("YYYY-MM-DD"),
                    effort: parseInt(effort, 10),
                  });
                  selectRun(null);
                }}
                leftSection={
                  runForSelectedDate ? (
                    <IconPencil size={20} />
                  ) : (
                    <IconCirclePlus size={20} />
                  )
                }
                fullWidth
              >
                {runForSelectedDate ? "Update" : "Add Run"}
              </Button>
              {runForSelectedDate && selectedRun && (
                <Button
                  size="lg"
                  variant="transparent"
                  onClick={() => setConfirm(true)}
                  leftSection={<IconTrash size={20} />}
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
                <IconX size={20} />
              </ActionIcon>
            </div>{" "}
          </>
        )}
      </div>

      <div
        className={`fixed bottom-0 z-50 flex flex-col gap-4 ${defaultPadding} pb-12 md:pb-4 ${defaultShadow} ${backdropBlur} ${borderTop}`}
        style={{
          transform: open ? "translateY(0)" : "translateY(800px)",
          transition: "300ms all ease-in-out",
        }}
      >
        <header className="flex justify-between items-baseline gap-2">
          <h2 className="text-xl font-bold tracking-tighter">Effort Levels</h2>
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => setOpen(false)}
          >
            <IconX size={16} />
          </ActionIcon>
        </header>
        {effortLevels.map((e) => {
          return (
            <div key={e.level}>
              <h3 className="font-bold">{e.level}</h3>
              <p className="text-xs text-white/50">{e.description}</p>
            </div>
          );
        })}
        <div className={`flex gap-2 rounded-md p-4 ${border}`}>
          <div>
            <IconInfoCircle size={16} />
          </div>
          <p className="text-xs">{disclaimer}</p>
        </div>
      </div>
    </DatesProvider>
  );
}
