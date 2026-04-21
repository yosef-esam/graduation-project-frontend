'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MdChevronLeft,
  MdCheckCircle,
  MdError,
  MdEdit,
  MdDelete,
  MdAssignment,
  MdEvent,
  MdScale,
  MdHistory,
  MdDashboard,
  MdMonitor
} from 'react-icons/md';
import { TransitionLink } from '@/components/TransitionLink';
import { PremiumChart } from '@/components/Dashboard/PremiumChart';
import Swal from 'sweetalert2';
import { deleteAnimal, updateAnimal } from '@/lib/actions/animalActions';

interface Entity {
  id: string | number;
  name: string | null;
  species: string | null;
  age: number | { years: number; months: number; days: number };
  weight: number;
  dateOfBirth: string | null;
  notes: string | null;
  healthStatus?: string;
  temperature?: string | number | null;
  distance?: number | null;
  deviceId?: string | null;
  batteryPercentage?: number;
  isActive?: boolean;
  accX?: number | null;
  accY?: number | null;
  accZ?: number | null;
  analysisReport?: string | null;
}

export default function EntityContent({ entity, id }: { entity: Entity, id: string }) {
  const mockTemp = (38.2 + (Number(id) % 10) * 0.1).toFixed(1);
  const mockDist = (1.2 + (Number(id) % 5) * 0.3).toFixed(1);
  const isFever = entity.healthStatus === "Fever" ||
    (entity.temperature && parseFloat(entity.temperature.toString()) > 39.5);
  const displayAge = typeof entity.age === 'object' && entity.age !== null
    ? `${entity.age.years}y ${entity.age.months}m`
    : `${entity.age} yr`;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'DRASTIC SYSTEM OVERRIDE',
      text: "PERMANENTLY DE-PROVISION THIS ENTITY FROM THE MATRIX?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#023b26',
      cancelButtonColor: '#e11d48',
      confirmButtonText: 'CONFIRM DESTRUCTION',
      cancelButtonText: 'ABORT',
      background: '#ffffff',
      backdrop: `rgba(2, 59, 38, 0.4)`,
      customClass: {
        popup: 'rounded-[3rem] border-4 border-emerald-500/10 shadow-2xl font-black',
        title: 'text-2xl tracking-tighter uppercase',
        confirmButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs',
        cancelButton: 'rounded-xl px-8 py-4 uppercase tracking-widest text-xs'
      }
    });

    if (result.isConfirmed) {
      try {
        await deleteAnimal(id);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          icon: 'success',
          title: 'Infrastructure Node Remastered',
          text: 'Entity de-provisioned successfully',
          background: '#023b26',
          color: '#ffffff',
        });
        setTimeout(() => {
          window.location.href = '/dashboard/herd';
        }, 1000);
      } catch (err: any) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Sync Authority Failure',
          text: err.message,
          background: '#e11d48',
          color: '#ffffff'
        });
      }
    }
  };

  const activityData = [
    { name: '00:00', activity: 12 },
    { name: '04:00', activity: 18 },
    { name: '08:00', activity: 48 },
    { name: '12:00', activity: 64 },
    { name: '16:00', activity: 52 },
    { name: '20:00', activity: 24 },
  ];

  const healthData = [
    { name: 'Mon', health: 98 },
    { name: 'Tue', health: 97 },
    { name: 'Wed', health: isFever ? 85 : 99 },
    { name: 'Thu', health: isFever ? 82 : 98 },
    { name: 'Fri', health: isFever ? 79 : 99 },
    { name: 'Sat', health: isFever ? 75 : 100 },
  ];

  const foodData = [
    { name: 'Mon', val: 12 },
    { name: 'Tue', val: 14 },
    { name: 'Wed', val: 13 },
    { name: 'Thu', val: isFever ? 8 : 15 },
    { name: 'Fri', val: isFever ? 6 : 14 },
    { name: 'Sat', val: isFever ? 5 : 16 },
  ];

  const handleUpdate = async () => {
    const currentDateOfBirth = entity.dateOfBirth ? entity.dateOfBirth.split('T')[0] : '';
    const { value: formValues } = await Swal.fire({
      title: 'MODIFY NODE PARAMETERS',
      html: `
        <div class="flex flex-col gap-5 p-4 text-left font-poppins">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Entity Name</label>
              <input id="swal-input-name" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm" value="${entity.name || ''}" placeholder="Enter name...">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Species</label>
              <input id="swal-input-species" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm" value="${entity.species || ''}" placeholder="e.g. Sheep, Cow...">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Mass (kg)</label>
              <input id="swal-input-weight" type="number" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm" value="${entity.weight}" placeholder="Weight in kg">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Date of Birth</label>
              <input id="swal-input-dob" type="date" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm" value="${currentDateOfBirth}">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Device ID</label>
              <input id="swal-input-deviceId" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm" value="${entity.deviceId || ''}" placeholder="Sensor device ID">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Health Status</label>
              <select id="swal-input-healthStatus" class="swal2-input !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm !h-14 shadow-sm !appearance-none" style="background: white;">
                <option value="Healthy" ${entity.healthStatus === 'Healthy' ? 'selected' : ''}>Healthy</option>
                <option value="Fever" ${entity.healthStatus === 'Fever' ? 'selected' : ''}>Fever</option>
              </select>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ml-1">Notes</label>
            <textarea id="swal-input-notes" class="swal2-textarea !m-0 !w-full !rounded-[1.25rem] border-gray-100 font-bold !text-sm min-h-[120px] shadow-sm">${entity.notes || ''}</textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'SYNC CHANGES',
      cancelButtonText: 'ABORT',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#94a3b8',
      background: '#ffffff',
      backdrop: `rgba(2, 59, 38, 0.4)`,
      customClass: {
        popup: 'rounded-[3rem] border-4 border-emerald-500/10 shadow-2xl',
        title: 'text-2xl font-black uppercase tracking-tighter pt-8 text-[#023b26]',
        confirmButton: 'rounded-2xl px-10 py-5 font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20',
        cancelButton: 'rounded-2xl px-10 py-5 font-black uppercase tracking-widest text-xs'
      },
      preConfirm: () => {
        const dobValue = (document.getElementById('swal-input-dob') as HTMLInputElement).value;
        return {
          deviceId: (document.getElementById('swal-input-deviceId') as HTMLInputElement).value,
          name: (document.getElementById('swal-input-name') as HTMLInputElement).value,
          species: (document.getElementById('swal-input-species') as HTMLInputElement).value,
          weight: parseInt((document.getElementById('swal-input-weight') as HTMLInputElement).value),
          dateOfBirth: dobValue ? new Date(dobValue).toISOString() : null,
          notes: (document.getElementById('swal-input-notes') as HTMLTextAreaElement).value,
          healthStatus: (document.getElementById('swal-input-healthStatus') as HTMLSelectElement).value,
        }
      }
    });

    if (formValues) {
      try {
        await updateAnimal(id, formValues);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Matrix Parameters Synchronized',
          background: '#023b26',
          color: '#ffffff',
          showConfirmButton: false,
          timer: 2000
        });
        window.location.reload();
      } catch (err: unknown) {
        Swal.fire({
          icon: 'error',
          title: 'Sync Protocol Failure',
          text: err instanceof Error ? err.message : 'Unknown error',
          background: '#e11d48',
          color: '#ffffff'
        });
      }
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <TransitionLink
            href="/dashboard/herd"
            className="group flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-white border border-gray-100 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            <MdChevronLeft size={28} className="text-[#023b26] transition-transform group-hover:-translate-x-1" />
          </TransitionLink>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-gray-900">Entity Data</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/60 mt-1.5">Authorization Level: Node Administrator</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUpdate}
            className="flex h-14 px-8 items-center justify-center gap-2 rounded-[1.25rem] bg-white border border-gray-100 text-[#023b26] text-[10px] font-black uppercase tracking-widest shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            <MdEdit size={18} />
            Modify Data
          </button>
          <button
            onClick={handleDelete}
            className="flex h-14 px-8 items-center justify-center gap-2 rounded-[1.25rem] bg-rose-50 border border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-widest shadow-sm transition-all hover:bg-rose-500 hover:text-white active:scale-95"
          >
            <MdDelete size={18} />
            Decommission
          </button>
        </div>
      </div>

      {/* Hero Breakdown Card - Stacked Single Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[4rem] border border-white/30 bg-white/50 p-12 md:p-16 pt-0  shadow-2xl backdrop-blur-3xl flex flex-col items-center text-center gap-16"
      >
        <div className="absolute right-0 top-0 -z-10 h-full w-full bg-linear-to-br from-emerald-500/10 via-transparent to-rose-500/5 blur-[150px]" />

        {/* Health HUD Circle */}
        <div className="relative group shrink-0 -mt-15">
          <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] relative flex items-center justify-center">
            <div className="absolute inset-0 -top-12">
              <PremiumChart
                title=""
                type="pie"
                data={[
                  { name: 'Health', value: isFever ? 65 : 100, color: isFever ? '#e11d48' : '#10b981' },
                  { name: 'Remaining', value: isFever ? 35 : 0, color: 'rgba(0,0,0,0.05)' }
                ]}
                dataKey="value"
                height={600}
                innerRadius={160}
                outerRadius={200}
                paddingAngle={4}
              />
            </div>

            <div className={`z-10 flex h-[280px] w-[280px] md:h-[350px] md:w-[350px] items-center justify-center rounded-full shadow-2xl border-[10px] border-white transition-all duration-700 bg-white overflow-hidden`}>
              <div className={`w-full h-full flex items-center justify-center ${isFever ? 'bg-rose-50' : 'bg-emerald-50'}`}>
                <span className={`text-[8rem] md:text-[12rem] font-black uppercase ${isFever ? 'text-rose-500' : 'text-[#023b26]'}`}>
                  {entity.name?.charAt(0) || "E"}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 rounded-[1.5rem] bg-[#023b26] text-white shadow-2xl z-20">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                Biometric Integrity: {isFever ? '65%' : '100%'}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-900 mb-6">
              {entity.name || "UNNAMED_ENTITY"}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              <span className="px-4 py-2 rounded-xl bg-gray-100/50 text-gray-400 font-mono text-[11px] font-black uppercase tracking-widest border border-gray-100/50">
                NODE_ADDR: #{id.slice(0, 16).toUpperCase()}
              </span>
              <div className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-widest border ${isFever ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm'
                }`}>
                {isFever ? <MdError size={14} className="animate-pulse" /> : <MdCheckCircle size={14} />}
                {isFever ? "CRITICAL_OVERHEAT" : "SYNCED_OPERATIONAL"}
              </div>
            </div>

            <div className="flex justify-center gap-10">
              <div className="text-center group">
                <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1 border-b-4 border-emerald-500/20 group-hover:border-emerald-500 transition-all">
                  {entity.temperature || mockTemp}°C
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Temp</span>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-black text-gray-900 tracking-tighter mb-1 border-b-4 border-blue-500/20 group-hover:border-blue-500 transition-all">
                  {entity.distance ? entity.distance.toFixed(1) : mockDist}km
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity Range</span>
              </div>
            </div>
          </div>

          {/* Video Game Style Component Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/30 rounded-[2.5rem] p-10 border border-white/40 shadow-inner">
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                  <span className="text-gray-500">Biological Health</span>
                  <span className={isFever ? "text-rose-500" : "text-emerald-500"}>{isFever ? '65%' : '100%'}</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                  <motion.div initial={{ width: 0 }} animate={{ width: isFever ? '65%' : '100%' }} className={`h-full ${isFever ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                  <span className="text-gray-500">Metabolic Energy</span>
                  <span className="text-blue-500">88%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                  <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-blue-500" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                  <span className="text-gray-500">Stress Equilibrium</span>
                  <span className="text-amber-500">92%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-amber-500" />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                  <span className="text-gray-500">Sync Stability</span>
                  <span className="text-purple-500">99.9%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                  <motion.div initial={{ width: 0 }} animate={{ width: '99.9%' }} className="h-full bg-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Sections - Stacked for extreme clarity */}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Identity Specs */}
          <div className="rounded-[3rem] border border-white/20 bg-white/40 p-10 shadow-xl backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800/40 mb-8 flex items-center gap-2">
              <MdAssignment size={16} /> Identity_Matrix
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Species_Genus', value: entity.species || 'Bos Taurus', icon: <MdMonitor className="text-emerald-500" /> },
                { label: 'Asset_Age', value: displayAge, icon: <MdHistory className="text-blue-500" /> },
                { label: 'Biological_Mass', value: `${entity.weight} kg`, icon: <MdScale className="text-orange-500" /> },
                { label: 'Registry_Date', value: entity.dateOfBirth ? entity.dateOfBirth.split('T')[0] : '2025-Q1-NULL', icon: <MdEvent className="text-purple-500" /> },
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-xl group-hover:bg-emerald-50 transition-colors">
                      {spec.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{spec.label}</span>
                  </div>
                  <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Node */}
          <div className="rounded-[3rem] border border-white/20 bg-white/40 p-10 shadow-xl backdrop-blur-xl flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-[#023b26] text-emerald-400">
                <MdDashboard size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900">Active Sink Node</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600/40">Hardware Identifier</p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#023b26] p-6 font-mono text-sm font-black text-emerald-400 border border-white/10 shadow-2xl flex justify-between items-center">
              <span>{entity.deviceId || "UNASSIGNED_STATION_DELTA_9"}</span>
              {entity.batteryPercentage !== undefined && entity.batteryPercentage !== null && (
                <span className="text-xs text-emerald-400/80 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-500/20">🔋 {entity.batteryPercentage}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Intelligence Summary - Single Column Analytics */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumChart
              title="Health Vitals"
              subtitle="Wellness trend"
              type="area"
              data={healthData}
              dataKey="health"
              color={isFever ? "#e11d48" : "#3b82f6"}
            />
            <PremiumChart
              title="Intake Matrix"
              subtitle="Daily feed (kg)"
              type="area"
              data={foodData}
              dataKey="val"
              color="#f59e0b"
            />
          </div>

          <PremiumChart
            title="Biological Activity Stream"
            subtitle="Frequency per 24h cycle"
            type="area"
            data={activityData}
            dataKey="activity"
            color={isFever ? "#e11d48" : "#10b981"}
            height={400}
          />

          {/* Intelligence Notes */}
          <div className="rounded-[3rem] border border-white/20 bg-white/40 p-10 shadow-xl backdrop-blur-xl relative overflow-hidden text-center">
            <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-500/5 blur-[80px]" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800/40 mb-6">Observational Intelligence</h3>
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-inner">
              <p className="text-lg font-bold text-gray-600 leading-relaxed italic">
                &quot;{entity.notes || "There is no notes here. "}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
