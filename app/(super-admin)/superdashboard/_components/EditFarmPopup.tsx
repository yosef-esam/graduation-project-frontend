"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { updateFarm } from "@/lib/actions/superAdminActions";
import { motion, AnimatePresence } from "framer-motion";
import { MdEdit, MdClose, MdBusiness, MdPerson } from "react-icons/md";
import { useRouter } from "next/navigation";
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
    const [ownerUserId, setOwnerUserId] = useState(farm.ownerUserId?.toString() || "");
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
                farmName,
                ownerUserId: Number(ownerUserId),
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
            const message = err instanceof Error ? err.message : "Update failed";
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'error',
              title: 'Modification Refused',
              text: message,
              background: '#e11d48',
              color: '#ffffff'
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
              className="absolute inset-0 bg-[#023b26]/60 backdrop-blur-2xl cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-2xl relative z-10"
            >
              <div className="bg-[#023b26] p-12 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-500/20 blur-[100px]" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-8 top-8 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-90 z-20"
                >
                  <MdClose size={28} />
                </button>
                <div className="relative z-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Modify Node Data</h2>
                  <p className="text-emerald-100/60 font-bold text-xs mt-3 uppercase tracking-[0.2em]">Updating synchronization parameters for ID: #{farm.id}</p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="p-12 space-y-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <MdBusiness className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={26} />
                    <input
                      placeholder="FARM OPERATIONAL NAME"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      required
                      className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 font-black text-sm text-gray-900 outline-none transition-all focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                    />
                  </div>

                  <div className="relative group">
                    <MdPerson className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={26} />
                    <input
                      type="number"
                      placeholder="OWNER USER ID"
                      value={ownerUserId}
                      onChange={(e) => setOwnerUserId(e.target.value)}
                      required
                      className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 font-black text-sm text-gray-900 outline-none transition-all focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-20 rounded-[2rem] bg-[#023b26] text-white font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all hover:bg-emerald-800 disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? "SAVING CHANGES..." : "CONFIRM MODIFICATIONS"}
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
