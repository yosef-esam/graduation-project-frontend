'use client';

import { PageHeader } from '@/components/Dashboard/PageHeader';
import { PremiumCard } from '@/components/Dashboard/PremiumCard';
import { PremiumChart } from '@/components/Dashboard/PremiumChart';
import { deleteFarm } from '@/lib/actions/superAdminActions';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  MdBarChart,
  MdCancel,
  MdCheckCircle,
  MdDelete,
  MdLocationOn,
  MdPerson,
  MdSearch,
  MdStore,
  MdEmail,
  MdBadge,
  MdPhone,
  MdArrowForward,
} from 'react-icons/md';
import Swal from 'sweetalert2';

// Popups
import AddWorkerForm from '@/app/(admin)/dashboard/users/_components/AddWorkerForm';
import EditFarmPopup from './EditFarmPopup';
import { TransitionLink } from '@/components/TransitionLink';

interface Farm {
  id: number | string;
  name: string;
  location: string;
  ownerName: string;
  isActive: boolean;
}

const TooltipCell = ({
  farm,
  showIdBelow,
}: {
  farm: Farm;
  showIdBelow?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update mouse position on move
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Ensure tooltip follows if user scrolls while hovering
  // handleMouseMove already tracks mouse in fixed viewport space.

  const dummyEmail = useMemo(
    () => `${farm.ownerName.toLowerCase().replace(/\s+/g, '.')}@farmiq.ai`,
    [farm.ownerName]
  );

  const dummyPhone = useMemo(() => {
    const idNum = typeof farm.id === 'number' ? farm.id : farm.id.length;
    const part1 = ((idNum * 77) % 90) + 10;
    const part2 = ((idNum * 123) % 9000) + 1000;
    const part3 = ((idNum * 456) % 9000) + 1000;
    return `+20 1${part1} ${part2} ${part3}`;
  }, [farm.id]);

  return (
    <div
      className="group/tooltip relative flex w-max cursor-pointer items-center gap-4"
      onMouseEnter={e => {
        setIsHovered(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-black text-emerald-600 shadow-inner transition-transform group-hover/tooltip:scale-110">
          {farm.name.charAt(0)}
        </div>

        {/* Touch Screen Tooltip (Static) */}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-[220px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl max-md:group-hover/tooltip:block">
          <p className="text-[11px] font-black uppercase tracking-tight text-gray-900">
            {farm.ownerName}
          </p>
          <div className="mt-2 space-y-1">
            <p className="flex items-center gap-1 truncate text-[9px] font-bold text-gray-500">
              <MdEmail size={10} className="text-emerald-500" /> {dummyEmail}
            </p>
            <p className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
              <MdPhone size={10} className="text-emerald-500" /> {dummyPhone}
            </p>
            <p className="mt-1 text-[9px] font-bold text-emerald-600">
              ID: HU-{farm.id}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1">
        <span className="block text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
          {farm.name}
        </span>
        {showIdBelow && (
          <span className="block pb-1 font-mono text-[10px] font-bold text-gray-400">
            #{farm.id.toString().slice(0, 12)}
          </span>
        )}
      </div>

      {/* Desktop Floating Tooltip (Cursor Follow) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="z-9999 pointer-events-none fixed hidden w-72 rounded-[2.5rem] border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl md:block"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              // Intelligent repositioning based on viewport proximity
              translateX:
                mousePos.x < 200
                  ? '5%'
                  : mousePos.x >
                    (typeof window !== 'undefined'
                      ? window.innerWidth - 200
                      : 0)
                    ? '-105%'
                    : '-50%',
              translateY: mousePos.y < 300 ? '20px' : '-110%',
            }}
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#023b26] text-2xl font-black text-emerald-400 shadow-inner">
                {farm.ownerName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 truncate text-[14px] font-black uppercase leading-none text-gray-900">
                  {farm.ownerName}
                </p>
                <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-emerald-700">
                  Primary Lead
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                  <MdEmail size={16} className="text-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-black uppercase tracking-wider text-gray-400">
                    Email Address
                  </p>
                  <p className="truncate text-[11px] font-bold text-gray-700">
                    {dummyEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                  <MdPhone size={16} className="text-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-black uppercase tracking-wider text-gray-400">
                    Contact Number
                  </p>
                  <p className="truncate text-[11px] font-bold text-gray-700">
                    {dummyPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                  <MdBadge size={16} className="text-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-black uppercase tracking-wider text-gray-400">
                    Network Signature
                  </p>
                  <p className="mt-0.5 truncate text-[10px] font-black uppercase text-emerald-600">
                    HU-{farm.id.toString().slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SuperAdminContentProps {
  initialFarms: Farm[];
  farmsCount: number;
}

export default function SuperAdminContent({
  initialFarms,
  farmsCount,
}: SuperAdminContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [farms, setFarms] = useState<Farm[]>(initialFarms || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredFarms = useMemo(() => {
    const query = (searchQuery || '').toLowerCase();
    return farms.filter(
      farm =>
        (farm.name || '').toLowerCase().includes(query) ||
        (farm.location || '').toLowerCase().includes(query) ||
        (farm.ownerName || '').toLowerCase().includes(query)
    );
  }, [farms, searchQuery]);
  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage);

  const paginatedFarms = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFarms.slice(start, start + itemsPerPage);
  }, [filteredFarms, currentPage]);

  const chartData = [
    { name: 'Jan', farms: Math.max(1, Math.floor(farmsCount * 0.4)) },
    { name: 'Feb', farms: Math.max(2, Math.floor(farmsCount * 0.6)) },
    { name: 'Mar', farms: farmsCount },
  ];

  const pieData = [
    { name: 'Active Nodes', value: farmsCount, color: '#2563eb' }, // Blue-600
    {
      name: 'Syncing',
      value: Math.max(1, Math.floor(farmsCount * 0.15)),
      color: '#60a5fa',
    }, // Blue-400
    {
      name: 'Offline',
      value: Math.max(1, Math.floor(farmsCount * 0.05)),
      color: '#bfdbfe',
    }, // Blue-200
  ];

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'DRASTIC SYSTEM OVERRIDE',
      text: 'PERMANENTLY DE-PROVISION THIS FARM NODE?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#023b26',
      cancelButtonColor: '#e11d48',
      confirmButtonText: 'CONFIRM DESTRUCTION',
      cancelButtonText: 'ABORT',
      background: '#ffffff',
      backdrop: `rgba(2, 59, 38, 0.4)`,
      customClass: {
        popup:
          'rounded-[2rem] border-4 border-emerald-500/10 shadow-2xl font-black',
        title: 'text-2xl tracking-tighter uppercase',
        confirmButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs',
        cancelButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs',
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteFarm(id);
        setFarms(prev => prev.filter(f => f.id !== id));
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: 'Infrastructure Node Remastered',
          text: 'Farm deleted successfully',
          background: '#023b26',
          color: '#ffffff',
        });
      } catch {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Sync Authority Failure',
          text: 'Failed to delete farm from grid',
          background: '#e11d48',
          color: '#ffffff',
        });
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="mx-auto max-w-screen-2xl">
        <PageHeader
          title="Central Grid"
          subtitle="Operational command center for global farm infrastructure, synchronized livestock monitoring, and system-wide intelligence analytics."
        />
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-10">
        <div className="flex flex-wrap items-center justify-end gap-4">
          <a href="/superdashboard/add">
            <button className="flex w-auto items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700">
              Add Farm
            </button>
          </a>
          <AddWorkerForm />
          <TransitionLink
            href="/dashboard"
            className="flex w-auto items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
          >
            Go to Dashboard
          </TransitionLink>
          <TransitionLink
            href="/dashboard/users"
            className="flex w-auto items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-center font-bold text-emerald-600 shadow-sm transition-colors hover:bg-emerald-100"
          >
            All Participants
          </TransitionLink>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <PremiumCard
            title="Total Infrastructure"
            value={farmsCount}
            icon={<MdStore size={24} />}
            color="green"
            trend={{ value: '12%', isPositive: true }}
            description="Total active farm networks"
          />
          <PremiumCard
            title="Active Workers"
            value={farmsCount * 5 + 12}
            icon={<MdPerson size={24} />}
            color="blue"
            trend={{ value: '4%', isPositive: true }}
            description="Personnel across all zones"
          />
          <PremiumCard
            title="Network Health"
            value="99.9%"
            icon={<MdBarChart size={24} />}
            color="purple"
            description="System uptime & stability"
          />
          <PremiumCard
            title="Active Alerts"
            value="2"
            icon={<MdCancel size={24} />}
            color="red"
            description="Immediate attention required"
          />
        </div>

        {/* Analytics & Search */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PremiumChart
              title="Infrastructure Scaling"
              subtitle="Farm registrations over time"
              type="area"
              data={chartData}
              dataKey="farms"
              color="#10b981"
            />
          </div>

          <div className="flex flex-col gap-6">
            <PremiumChart
              title="Sector Distribution"
              subtitle="Resource allocation by zone"
              type="pie"
              data={pieData}
              dataKey="value"
              nameKey="name"
              height={380}
              outerRadius={150}
              showLabel={true}
            />
          </div>
        </div>

        {/* Modern Table Section */}
        <div className="relative overflow-hidden rounded-[3rem] border border-white/20 bg-white/40 p-8 shadow-2xl backdrop-blur-3xl xl:p-12">
          <div className="absolute right-0 top-0 -z-10 h-96 w-96 bg-emerald-500/5 blur-[120px]" />

          <div className="mb-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 text-4xl font-black uppercase leading-none tracking-tighter text-gray-900">
                Registered Users
              </h2>
              <p className="text-sm font-bold text-gray-400">
                Inventory of all provisioned farm environments.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
              <div className="md:w-lg relative w-full">
                <MdSearch
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Query nodes by name, location, or lead..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-16 w-full rounded-2xl border border-white/20 bg-white/60 pl-14 pr-6 font-bold text-gray-900 shadow-sm outline-none ring-offset-2 transition-all focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex w-full flex-wrap items-center justify-stretch gap-4 sm:w-auto">
                <TransitionLink
                  href="/dashboard"
                  className="flex h-16 w-full items-center justify-center whitespace-nowrap rounded-2xl bg-emerald-600 px-6 text-center font-bold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 sm:w-auto"
                >
                  Go to Dashboard
                </TransitionLink>
                <TransitionLink
                  href="/dashboard/users"
                  className="flex h-16 w-full items-center justify-center whitespace-nowrap rounded-2xl border border-emerald-200 bg-emerald-50 px-6 text-center font-bold text-emerald-600 shadow-sm transition-colors hover:bg-emerald-100 sm:w-auto"
                >
                  All Participants
                </TransitionLink>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Desktop Table Layout (>= 1024px) */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <th className="pb-8 pl-4">Node Hash</th>
                    <th className="pb-8">Environment</th>
                    <th className="pb-8">Deployment Zone</th>
                    <th className="pb-8">Primary Lead</th>
                    <th className="pb-8 text-center">Status</th>
                    <th className="pb-8 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/30">
                  <AnimatePresence mode="popLayout">
                    {paginatedFarms.map((farm, index) => (
                      <motion.tr
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        key={farm.id}
                        className="group cursor-default transition-all hover:bg-emerald-50/40"
                      >
                        <td className="py-8 pl-4 font-mono text-[10px] font-bold text-gray-300">
                          #{farm.id.toString().slice(0, 12)}
                        </td>
                        <td className="py-8">
                          <TooltipCell farm={farm} />
                        </td>
                        <td className="py-8">
                          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-gray-600">
                            <MdLocationOn
                              size={18}
                              className="text-emerald-500"
                            />
                            {farm.location}
                          </div>
                        </td>
                        <td className="py-8">
                          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-gray-600">
                            <MdPerson size={18} className="text-blue-500" />
                            {farm.ownerName}
                          </div>
                        </td>
                        <td className="py-8">
                          <div className="flex justify-center">
                            {farm.isActive ? (
                              <span className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black text-emerald-600 shadow-sm">
                                <MdCheckCircle size={14} /> ONLINE
                              </span>
                            ) : (
                              <span className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2 text-[10px] font-black text-rose-600 shadow-sm">
                                <MdCancel size={14} /> OFFLINE
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-8 pr-4">
                          <div className="flex items-center justify-end gap-3">
                            <EditFarmPopup farm={farm} />
                            <button
                              onClick={() => handleDelete(Number(farm.id))}
                              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 text-gray-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Layout (< 1024px) */}
            <div className="flex flex-col gap-6 lg:hidden">
              <AnimatePresence mode="popLayout">
                {paginatedFarms.map((farm, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    key={`mobile-${farm.id}`}
                    className="flex flex-col gap-4 rounded-[2rem] border border-gray-100 bg-white/50 p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <TooltipCell farm={farm} showIdBelow={true} />
                      <div>
                        {farm.isActive ? (
                          <span className="flex items-center gap-1 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-600 shadow-sm">
                            <MdCheckCircle size={14} /> ONLINE
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-xl border border-rose-100 bg-rose-50 px-3 py-1 text-[10px] font-black text-rose-600 shadow-sm">
                            <MdCancel size={14} /> OFFLINE
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <span className="mb-1 block text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Zone
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                          <MdLocationOn
                            className="text-emerald-500"
                            size={16}
                          />
                          {farm.location}
                        </div>
                      </div>
                      <div>
                        <span className="mb-1 block text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Lead
                        </span>
                        <div className="flex items-center gap-1 truncate text-xs font-bold text-gray-700">
                          <MdPerson
                            className="shrink-0 text-blue-500"
                            size={16}
                          />
                          {farm.ownerName}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-3 border-t border-gray-100/50 pt-4">
                      <EditFarmPopup farm={farm} />
                      <button
                        onClick={() => handleDelete(Number(farm.id))}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100/50 text-gray-500 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredFarms.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 opacity-40 grayscale">
                <MdStore size={100} className="mb-6 text-emerald-200" />
                <p className="text-3xl font-black uppercase tracking-tighter text-gray-400">
                  Zero Node Matches
                </p>
                <p className="mt-2 font-bold text-gray-400">
                  The matrix query returned no matching infrastructure.
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
                <p className="text-xs font-bold text-gray-400">
                  Showing{' '}
                  <span className="text-gray-900">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="text-gray-900">
                    {Math.min(currentPage * itemsPerPage, filteredFarms.length)}
                  </span>{' '}
                  of{' '}
                  <span className="text-gray-900">{filteredFarms.length}</span>{' '}
                  nodes
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 transition-all hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400"
                  >
                    <MdArrowForward className="rotate-180" size={18} />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black transition-all ${currentPage === i + 1
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                          : 'border border-gray-100 bg-white text-gray-400 hover:border-emerald-500 hover:text-emerald-500'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 transition-all hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400"
                  >
                    <MdArrowForward size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
