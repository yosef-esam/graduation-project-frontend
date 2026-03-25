'use client';

import { useState, useTransition } from 'react';
import { createAnimal } from '@/lib/actions/animalActions';
import { MdPets, MdAdd, MdDescription, MdEvent, MdMonitorWeight, MdHeight, MdDevices } from 'react-icons/md';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import Flatpickr from "react-flatpickr";
import Swal from 'sweetalert2';
import CustomSelect from '@/lib/utils/CustomSelect';

const SPECIES_OPTIONS = [
  { id: 'Cattle', label: 'Cattle (Bovine)' },
  { id: 'Sheep', label: 'Sheep (Ovine)' },
  { id: 'Goats', label: 'Goats (Caprine)' },
  { id: 'Horses', label: 'Horses (Equine)' },
  { id: 'Other', label: 'Other/Custom' },
];

export default function AddAnimalForm() {
  const [isPending, startTransition] = useTransition();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
  const [species, setSpecies] = useState<string | number>('Cattle');

  const [formData, setFormData] = useState({
    deviceId: '',
    name: '',
    species: '',
    weight: 0,
    dateOfBirth: '',
    notes: '',
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[0-9]/g, ""); // No numbers
    setFormData({ ...formData, name: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    if (Number(value) >= 0 || value === '') {
      setFormData({ ...formData, [field]: value });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name: formData.name,
      species: species.toString(),
      weight: Number(formData.weight),
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '',
      notes: formData.notes,
      deviceId: formData.deviceId,
    };

    startTransition(async () => {
      try {
        await createAnimal(data as any);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: 'Entity Provisioned to Matrix',
          background: '#023b26',
          color: '#ffffff',
        });
        setFormData({ name: '', weight: 0, notes: '', deviceId: '', species: '', dateOfBirth: '' });
        setDateOfBirth(new Date());
        setSpecies('Cattle');
      } catch (err) {
        console.error(err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Registration Refused',
          text: 'Failed to synchronize entity with node',
          background: '#e11d48',
          color: '#ffffff',
        });
      }
    });
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Entity Provisioning"
        subtitle="Register new biological assets into the monitoring node. Ensure all biometric data is accurate for precise real-time tracking."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[3.5rem] border border-white/20 bg-white/40 p-12 shadow-2xl backdrop-blur-3xl"
      >
        <div className="mb-12 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20">
            <MdPets size={36} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Entry Protocol</h2>
            <p className="font-bold text-gray-400 text-sm">Biological entity synchronization details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Device ID / Hardware Serial</label>
              <div className="relative group">
                <MdDevices className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  name="deviceId"
                  placeholder="SN-XXXX-XXXX-XXXX"
                  value={formData.deviceId}
                  onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                  required
                  className="h-16 w-full rounded-2xl border border-gray-100 bg-white/50 pl-14 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Primary Identifier</label>
              <div className="relative group">
                <MdAdd className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  name="name"
                  placeholder="Entity Name/ID (No Numbers)"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  className="h-16 w-full rounded-2xl border border-gray-100 bg-white/50 pl-14 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Biological Species</label>
              <CustomSelect
                options={SPECIES_OPTIONS}
                value={species}
                onChange={setSpecies}
                className="w-full"
                placeholder="Select Species"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Mass (KG)</label>
              <div className="relative group">
                <MdMonitorWeight className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  name="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.weight}
                  onChange={(e) => handleNumberChange(e, 'weight')}
                  className="h-16 w-full rounded-2xl border border-gray-100 bg-white/50 pl-14 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Activation Date (Birth)</label>
            <div className="relative group">
              <MdEvent className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none group-focus-within:text-emerald-500 transition-colors" size={20} />
              <Flatpickr
                value={dateOfBirth || ''}
                onChange={([date]) => setDateOfBirth(date)}
                options={{
                  dateFormat: "Y-m-d",
                  disableMobile: true,
                  maxDate: "today",
                }}
                className="h-16 w-full rounded-2xl border border-gray-100 bg-white/50 pl-14 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm cursor-pointer"
                placeholder="Select birth date (no future dates)..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 pl-1">Biometric Notes</label>
            <div className="relative group">
              <MdDescription className="absolute left-6 top-5 text-gray-400 z-10 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <textarea
                name="notes"
                placeholder="Observed health trends, vaccinations, etc."
                rows={5}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-3xl border border-gray-100 bg-white/50 p-6 pl-14 font-medium text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 resize-none shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="group relative flex h-20 w-full items-center justify-center overflow-hidden rounded-[2rem] bg-[#023b26] text-white transition-all hover:bg-[#012217] disabled:opacity-50 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-transparent transition-transform group-hover:translate-x-full duration-500 ease-in-out" />
            <span className="relative z-10 font-black uppercase tracking-[0.3em] text-sm">
              {isPending ? 'SYNCHRONIZING...' : 'AUTHORIZE REGISTRATION'}
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
