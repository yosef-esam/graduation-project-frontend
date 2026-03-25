'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { updateFarm } from '@/lib/actions/superAdminActions';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdEdit,
  MdClose,
  MdBusiness,
  MdPerson,
  MdLocationOn,
  MdToggleOn,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface Farm {
  id: number | string;
  name: string;
  location: string;
  ownerName: string;
  isActive: boolean;
  ownerUserId?: number; // Added to handle ID if needed
}

export default function EditFarmPopup({ farm }: { farm: Farm }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [farmName, setFarmName] = useState(farm.name);
  const [location, setLocation] = useState(farm.location);
  const [ownerUserId, setOwnerUserId] = useState(
    farm.ownerUserId?.toString() || ''
  );
  const [isActive, setIsActive] = useState(farm.isActive);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await updateFarm(Number(farm.id), {
        name: farmName,
        location,
        ownerUserId: Number(ownerUserId),
        isActive,
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Infrastructure Link Updated',
        background: '#023b26',
        color: '#ffffff',
      });
      setIsOpen(false);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Modification Refused',
        text: message,
        background: '#e11d48',
        color: '#ffffff',
      });
    } finally {
      setLoading(false);
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-pointer bg-[#023b26]/60 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-2xl"
          >
            <div className="relative overflow-hidden bg-[#023b26] p-12 text-white">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-500/20 blur-[100px]" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-8 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 transition-all hover:scale-110 hover:bg-white/20 active:scale-90"
              >
                <MdClose size={28} />
              </button>
              <div className="relative z-10">
                <h2 className="text-4xl font-black uppercase leading-none tracking-tighter">
                  Modify Node Data
                </h2>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-100/60">
                  Updating synchronization parameters for ID: #{farm.id}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6 p-12">
              <div className="space-y-6">
                <div className="group relative">
                  <MdBusiness
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <input
                    placeholder="FARM OPERATIONAL NAME"
                    value={farmName}
                    onChange={e => setFarmName(e.target.value)}
                    required
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <div className="group relative">
                  <MdLocationOn
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <input
                    placeholder="LOCATION"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <div className="group relative">
                  <MdPerson
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <input
                    type="number"
                    placeholder="OWNER USER ID"
                    value={ownerUserId}
                    onChange={e => setOwnerUserId(e.target.value)}
                    required
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <div
                  className="group relative flex h-20 w-full cursor-pointer items-center rounded-[1.5rem] border border-gray-100 bg-gray-50/50 px-6 text-sm font-black text-gray-900 shadow-inner outline-none"
                  onClick={() => setIsActive(!isActive)}
                >
                  <MdToggleOn
                    className={`z-10 transition-colors ${isActive ? 'text-emerald-500' : 'text-gray-300'}`}
                    size={32}
                  />
                  <span className="ml-4">
                    {isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-20 w-full rounded-[2rem] bg-[#023b26] text-sm font-black uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'SAVING CHANGES...' : 'CONFIRM MODIFICATIONS'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 text-gray-400 transition-all hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
      >
        <MdEdit size={20} />
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
