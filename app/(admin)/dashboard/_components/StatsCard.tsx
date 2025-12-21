interface StatsCardProps {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  badgeType: 'success' | 'danger';
}

export function StatsCard({
  icon,
  iconBg,
  label,
  value,
  badgeType,
}: StatsCardProps) {
  const badgeStyles =
    badgeType === 'success'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
