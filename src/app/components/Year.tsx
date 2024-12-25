import Month from "./Month";

export default function Year({ year }: { year: number }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <h2 className="p-4 text-4xl font-bold tracking-tighter">{year}</h2>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(32, minmax(0, 1fr))" }}
      >
        <div />
        {Array.from({ length: 31 }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 flex items-center justify-center text-xs text-white/50"
          >
            {index + 1}
          </div>
        ))}
      </div>
      {months.map((m, index) => (
        <Month key={index} name={m} index={index} year={year} />
      ))}
    </div>
  );
}