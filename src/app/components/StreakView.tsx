import { defaultPadding } from "../lib/styles";
import Year from "./Year";

export default function StreakView() {
  const years = [2025];

  return (
    <main
      className={`w-full flex flex-col gap-8 ${defaultPadding} pb-48 md:pb-24`}
    >
      {years.reverse().map((y) => (
        <Year key={y} year={y} />
      ))}
    </main>
  );
}
