import Year from "./Year";

export default function StreakView() {
  const years = [2024, 2025];

  return (
    <div className="w-full flex flex-col gap-2">
      <main className="flex flex-col gap-8 pb-48">
        {years.map((y) => (
          <Year key={y} year={y} />
        ))}
      </main>
    </div>
  );
}
