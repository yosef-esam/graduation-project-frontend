import { Thermometer, Activity, CheckCircle2, MoreVertical } from 'lucide-react';

const alerts = [
  {
    id: 1,
    icon: Thermometer,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'Cow #402 - High Temperature',
    description: 'Detected irregular body heat signature.',
    severity: 'Critical',
    severityStyle: 'bg-red-100 text-red-700',
    time: '10 mins ago',
  },
  {
    id: 2,
    icon: Activity,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Cow #115 - Low Activity',
    description: 'Movement below threshold for 4 hours.',
    severity: 'Warning',
    severityStyle: 'bg-orange-100 text-orange-700',
    time: '45 mins ago',
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    title: 'Cow #89 - Returned to Normal',
    description: 'Vitals stabilized after treatment.',
    severity: 'Resolved',
    severityStyle: 'bg-green-100 text-green-700',
    time: '1 hr ago',
  },
];

export function AlertsList() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Latest Alerts</h3>
        <button className="text-sm text-green-600 font-medium hover:text-green-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-full ${alert.iconBg} flex items-center justify-center flex-shrink-0`}>
              <alert.icon className={`w-5 h-5 ${alert.iconColor}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1">{alert.title}</h4>
              <p className="text-sm text-gray-500">{alert.description}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${alert.severityStyle}`}>
                {alert.severity}
              </span>
              <span className="text-sm text-gray-400">{alert.time}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
