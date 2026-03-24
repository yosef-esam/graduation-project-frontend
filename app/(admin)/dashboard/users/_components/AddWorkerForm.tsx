"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createWorkerAction } from "@/actions/usersAction";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdClose, MdPerson, MdEmail, MdPhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import InputField from "@/utils/InputField";
import Swal from 'sweetalert2';

export default function AddWorkerForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Only numbers
        setPhoneNumber(value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[0-9]/g, ""); // No numbers
        setFullName(value);
    };

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            await createWorkerAction({
                fullName,
                email,
                phoneNumber,
            });

            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'success',
              title: 'Personnel Matrix Provisioned',
              background: '#023b26',
              color: '#ffffff',
            });
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setIsOpen(false);
            router.refresh();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Provisioning failed";
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'error',
              title: 'Provisioning Refused',
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
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
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
              className="w-full max-w-2xl overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] relative z-10"
            >
              {/* Glass Header */}
              <div className="bg-[#023b26] p-12 text-white relative overflow-hidden pointer-events-auto">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-500/20 blur-[100px]" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-8 top-8 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-90 z-20 cursor-pointer"
                >
                  <MdClose size={28} />
                </button>
                <div className="relative z-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Provision Personnel</h2>
                  <p className="text-emerald-100/60 font-bold text-xs mt-3 uppercase tracking-[0.2em]">Adding new identity to the synchronized node matrix.</p>
                </div>
              </div>

              <form onSubmit={handleAdd} className="p-12 space-y-6 pointer-events-auto">
                <div className="space-y-6">
                  <div className="relative group">
                    <MdPerson className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={26} />
                    <InputField
                      label=""
                      placeholder="FULL NAME (NO NUMBERS)"
                      value={fullName}
                      onChange={handleNameChange}
                      required
                      className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 font-black text-sm text-gray-900 outline-none transition-all focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                    />
                  </div>

                  <div className="relative group">
                    <MdEmail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={26} />
                    <InputField
                      type="email"
                      label=""
                      placeholder="EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 font-black text-sm text-gray-900 outline-none transition-all focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                    />
                  </div>

                  <div className="relative group">
                    <MdPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={26} />
                    <InputField
                      type="tel"
                      label=""
                      placeholder="PHONE NUMBER (DIGITS ONLY)"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 font-black text-sm text-gray-900 outline-none transition-all focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-20 rounded-[2rem] bg-[#023b26] text-white font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all hover:bg-emerald-800 disabled:opacity-50 active:scale-[0.98] hover:shadow-emerald-900/40"
                >
                  {loading ? "PROVISIONING..." : "AUTHORIZE SUCCESSION"}
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
          className="group flex w-fit items-center gap-3 rounded-2xl bg-[#023b26] px-10 py-5 text-sm font-black text-white shadow-2xl shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
        >
          <MdAdd size={22} className="transition-transform group-hover:rotate-90" />
          ADD WORKER
        </button>

        {mounted && createPortal(modalContent, document.body)}
      </>
    );
}
