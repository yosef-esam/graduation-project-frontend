interface StatsCardProps {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  badge: string;
  badgeType: 'success' | 'danger';
}

export function StatsCard({ icon, iconBg, label, value, badge, badgeType }: StatsCardProps) {
  const badgeStyles = badgeType === 'success' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-red-100 text-red-700';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyles}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
