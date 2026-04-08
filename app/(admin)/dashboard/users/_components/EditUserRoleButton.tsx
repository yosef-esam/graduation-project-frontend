'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdEdit, MdClose, MdPerson, MdEmail, MdPhone } from 'react-icons/md';
import InputField from '@/utils/InputField';
import CustomSelect from '@/utils/CustomSelect';
import Swal from 'sweetalert2';
import { updateUserAction } from '@/lib/actions/usersAction';

interface User {
  userId: number | string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  farmId: string | number;
}

const roleOptions = [
  { id: 'Admin', label: 'Admin' },
  { id: 'Worker', label: 'Worker' },
];

export default function EditUserRoleButton({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [role, setRole] = useState(user.userRole);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  async function handleUpdate() {
    try {
      setLoading(true);
      await updateUserAction(user.userId, {
        fullName,
        email,
        phoneNumber,
        userRole: role,
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Identity Update Confirmed',
        background: '#023b26',
        color: '#ffffff',
      });
      setIsOpen(false);
      window.location.reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Modification Denied',
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
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)]"
          >
            {/* Glass Header */}
            <div className="pointer-events-auto relative overflow-hidden bg-[#023b26] p-12 text-white">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-500/20 blur-[100px]" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-8 top-8 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white/10 transition-all hover:scale-110 hover:bg-white/20 active:scale-90"
              >
                <MdClose size={28} />
              </button>
              <div className="relative z-10">
                <h2 className="text-4xl font-black uppercase leading-none tracking-tighter">
                  Modify Identity
                </h2>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-100/60">
                  Updating synchronization parameters for ID: #
                  {user.userId.toString().slice(0, 8)}
                </p>
              </div>
            </div>

            <div className="pointer-events-auto space-y-6 p-12">
              <div className="space-y-6">
                <div className="group relative">
                  <MdPerson
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <InputField
                    label=""
                    placeholder="FULL NAME"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <div className="group relative">
                  <MdEmail
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <InputField
                    type="email"
                    label=""
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <div className="group relative">
                  <MdPhone
                    className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-emerald-500"
                    size={26}
                  />
                  <InputField
                    label=""
                    placeholder="PHONE NUMBER"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="h-20 w-full rounded-[1.5rem] border border-gray-100 bg-gray-50/50 pl-16 pr-8 text-sm font-black text-gray-900 shadow-inner outline-none transition-all focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5"
                  />
                </div>

                <CustomSelect
                  label="Access Level Protocol"
                  options={roleOptions}
                  value={role}
                  onChange={v => setRole(v as string)}
                  className="w-full"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="h-20 w-full rounded-[2rem] bg-[#023b26] text-sm font-black uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:bg-emerald-800 hover:shadow-emerald-900/40 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'SAVING CHANGES...' : 'SAVE MODIFICATIONS'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm transition-all hover:bg-[#023b26] hover:text-white hover:shadow-emerald-200"
      >
        <MdEdit size={22} />
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
