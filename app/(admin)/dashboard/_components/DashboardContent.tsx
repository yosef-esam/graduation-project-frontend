import { getAnimals, getAnimalsCount } from '@/actions/animalActions';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { PremiumCard } from '@/components/Dashboard/PremiumCard';
import { TransitionLink } from '@/components/TransitionLink';
import {
  MdAdd,
  MdBarChart,
  MdPets,
  MdThermostat,
  MdTrendingUp,
  MdWarning,
} from 'react-icons/md';
import { ActivityChart } from './ActivityChart';
import { TemperatureChart } from './TemperatureChart';
import { ViewAll } from './ViewAll';

export async function DashboardContent() {
  const counts = await getAnimalsCount();
  const cows = await getAnimals();

  return (
    <div className="flex-1 space-y-10">
      <div className="mx-auto max-w-[1340px]">
        <PageHeader
          title="Farm Overview"
          subtitle="Real-time physiological and behavioral monitoring for your synchronized biological assets."
        />
      </div>

      <div className="mx-auto max-w-[1340px] space-y-10 pt-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TransitionLink
            href="/dashboard/herd"
            className="block h-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <PremiumCard
              icon={<MdPets size={24} />}
              title="Total Livestock"
              value={counts?.totalCount || 0}
              color="blue"
              className="h-full"
              description="Total animals registered in node"
            />
          </TransitionLink>
          <TransitionLink
            href="/dashboard/alerts"
            className="block h-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <PremiumCard
              icon={<MdWarning size={24} />}
              title="Health Alerts"
              value={
                (counts?.feverCount || 0) + (counts?.lowActivityCount || 0)
              }
              color="red"
              className="h-full"
              trend={{ value: '2', isPositive: false }}
              description="Animals requiring immediate check"
            />
          </TransitionLink>
          <TransitionLink
            href="/dashboard/analytics"
            className="block h-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <PremiumCard
              icon={<MdThermostat size={24} />}
              title="Avg Temperature"
              value="38.6°C"
              color="orange"
              className="h-full"
              description="Normal range monitoring"
            />
          </TransitionLink>
        </div>

        {/* Quick Access Control */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <TransitionLink
            href="/dashboard/addanimal"
            className="group relative h-full overflow-hidden rounded-[3rem] bg-[#023b26] p-10 text-white shadow-2xl transition-all hover:scale-[1.01] hover:bg-emerald-800 active:scale-[0.99]"
          >
            <div className="absolute right-0 top-0 z-0 h-64 w-64 bg-emerald-500/10 blur-[80px]" />
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                <MdAdd size={40} />
              </div>
              <h3 className="mb-1 text-3xl font-black uppercase tracking-tighter">
                Provision
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/60">
                Register New Entity into Matrix
              </p>
            </div>
          </TransitionLink>

          <TransitionLink
            href="/dashboard/analytics"
            className="group relative h-full overflow-hidden rounded-[3rem] border border-white/20 bg-white/40 p-10 shadow-xl backdrop-blur-xl transition-all hover:scale-[1.01] hover:bg-white/60 active:scale-[0.99]"
          >
            <div className="absolute right-0 top-0 z-0 h-64 w-64 bg-emerald-500/5 blur-[80px]" />
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#023b26]/5 text-[#023b26] transition-transform group-hover:scale-110">
                <MdBarChart size={40} />
              </div>
              <h3 className="mb-1 text-3xl font-black uppercase tracking-tighter text-gray-900">
                Analyze
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#023b26]/40">
                Operational Yield Intelligence
              </p>
            </div>
          </TransitionLink>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <TemperatureChart />
          <ActivityChart />
        </div>

        {/* Latest Activity / Inventory */}
        <div className="relative overflow-hidden rounded-[3.5rem] border border-white bg-white/40 p-10 shadow-none backdrop-blur-3xl">
          <div className="absolute right-0 top-0 -z-10 h-96 w-96 bg-emerald-500/5 blur-[120px]" />

          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-3xl font-black uppercase tracking-tighter text-gray-900">
                Recent Inventory
              </h3>
              <p className="text-sm font-bold italic text-gray-400">
                Synchronized biometric telemetry stream.
              </p>
            </div>
            <TransitionLink
              href={'/dashboard/herd'}
              className="group flex items-center gap-3 rounded-2xl bg-[#023b26]/5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#023b26] transition-all hover:bg-[#023b26] hover:text-white"
            >
              Examine Full Herd
              <MdTrendingUp className="transition-transform group-hover:translate-x-1" />
            </TransitionLink>
          </div>
          <ViewAll cows={cows} limit={3} />
        </div>
      </div>
    </div>
  );
}
