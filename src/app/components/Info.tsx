export default function Info({
  label,
  value,
  color,
  alignRight,
}: {
  label: string;
  value: string;
  color: string;
  alignRight?: boolean;
}) {
  return (
    <div className={`flex flex-col ${alignRight && "items-end"}`}>
      <p className="text-xs text-white/50">{label}</p>
      <p className="font-bold" style={{ color: `var(--${color})` }}>
        {value}
      </p>
    </div>
  );
}
