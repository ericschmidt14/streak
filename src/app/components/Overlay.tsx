"use client";
import { ActionIcon, Button, Popover, SegmentedControl } from "@mantine/core";
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
import { effortLevels } from "../lib/data";
import {
  backdropBlur,
  borderTop,
  defaultPadding,
  defaultShadow,
  inputStyles,
} from "../lib/styles";

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
        className={`fixed bottom-0 left-0 z-50 w-screen ${defaultPadding} pb-12 md:pb-4 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2 ${defaultShadow} ${backdropBlur} ${borderTop} backdrop-blur-md`}
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
          rightSection={<IconCalendar size={16} />}
          styles={{
            input: inputStyles,
          }}
          readOnly
        />
        <div className="flex items-center gap-2 pr-1">
          <SegmentedControl
            value={effort}
            onChange={setEffort}
            data={[
              { label: "Easy", value: "1" },
              { label: "Moderate", value: "3" },
              { label: "Hard", value: "5" },
            ]}
            withItemsBorders={false}
            className="w-full"
            styles={{
              root: {
                background: "rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "2.5px",
              },
              label: {
                padding: "4px 6px",
              },
              indicator: {
                background: "var(--mantine-color-orange-light)",
                borderRadius: "2px",
              },
            }}
            fullWidth
          />
          <Popover
            width={320}
            position="left"
            shadow="xl"
            radius="md"
            withArrow
            styles={{
              dropdown: {
                background: "rgba(0, 0, 0, 1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
              arrow: {
                background: "rgba(0, 0, 0, 1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Popover.Target>
              <ActionIcon variant="transparent" color="white">
                <IconInfoCircle size={16} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex flex-col gap-4">
                {effortLevels.map((e) => {
                  return (
                    <div key={e.level}>
                      <h3 className="font-bold">{e.level}</h3>
                      <p className="text-xs text-white/50">{e.description}</p>
                    </div>
                  );
                })}
                <p className="text-xs">
                  Note that these categories are highly subjective and can vary
                  significantly based on individual fitness levels, running
                  experience, daily energy levels, weather conditions, terrain,
                  and other personal factors. Use this guide as a rough
                  framework to gauge effort, but always listen to your body and
                  prioritize your health and safety. When in doubt, consult with
                  a coach or professional for personalized advice.
                </p>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <Button
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
