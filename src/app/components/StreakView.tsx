import { useStreakContext } from "../context/StreakContext";
import { defaultPadding } from "../lib/styles";
import Year from "./Year";

export default function StreakView() {
  const { currentYear, setCurrentYear, minYear, maxYear } = useStreakContext();

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };

  return (
    <main
      className={`w-full flex flex-col gap-8 ${defaultPadding} pb-64 md:pb-24`}
    >
      <Year
        year={currentYear}
        minYear={minYear}
        maxYear={maxYear}
        onYearChange={handleYearChange}
      />
    </main>
  );
}
