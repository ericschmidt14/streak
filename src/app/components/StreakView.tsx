import Year from "./Year";

export default function StreakView() {
  const years = [2024, 2025];

  return (
    <main className="w-full flex flex-col gap-8 px-8 pb-48">
      {years.map((y) => (
        <Year key={y} year={y} />
      ))}
    </main>
  );
}
