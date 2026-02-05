interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string; // Or ReactNode if passing component
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
}: StatsCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{title}</p>
          <p className="text-primary mt-2 text-2xl font-bold">{value}</p>
          <p
            className={`mt-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {change} from last month
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
