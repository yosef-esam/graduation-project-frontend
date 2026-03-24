"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MdNotifications, MdCalendarMonth, MdPerson, MdLogout, MdSettings, MdError, MdWarning, MdInfo, MdMenu } from 'react-icons/md';
import { TransitionLink } from '@/components/TransitionLink';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction } from '@/actions/authActions';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ScrollableWrapper from '@/components/Dashboard/ScrollableWrapper';

export default function AdminHeader({ onMenuClickAction }: { onMenuClickAction?: () => void }) {
  const [currentTime, setCurrentTime] = useState("");
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const userData = {
    name: "Dr. Amir Khairy",
    email: "amirkhairy7@gmail.com",
    role: "Operational Node Commander",
  };

  const dummyNotifications = [
    { id: 1, type: 'critical', title: 'Viral Outbreak Warning', time: '2m ago', icon: <MdError className="text-rose-500" /> },
    { id: 2, type: 'warning', title: 'Feed Reservoir Low', time: '15m ago', icon: <MdWarning className="text-amber-500" /> },
    { id: 3, type: 'info', title: 'System Batch Update', time: '1h ago', icon: <MdInfo className="text-emerald-500" /> },
    { id: 4, type: 'critical', title: 'Unauthorized Node Access', time: '2h ago', icon: <MdError className="text-rose-500" /> },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `Today, ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })} • ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileTooltip(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "TERMINATE SESSION?",
      text: "Disconnecting from the FarmIQ matrix.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#023b26",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "DISCONNECT",
      cancelButtonText: "ABORT",
      background: "#ffffff",
      customClass: {
        popup: "rounded-[2rem] border-4 border-rose-500/10 shadow-2xl font-black",
      }
    });

    if (result.isConfirmed) {
      await logoutAction();
      router.push("/login");
    }
  };

  return (
    <div className="mb-10 w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white/40 p-10 rounded-[2.5rem] border border-white shadow-xl backdrop-blur-xl relative z-40">
      <div className="flex flex-col items-start gap-4">
        <Image src="/images/logo.svg" alt="FarmIQ" width={160} height={40} className="h-10 w-auto md:m-0 m-auto object-contain invert" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <button
              className="xl:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 text-gray-700 transition"
              onClick={onMenuClickAction}
              aria-label="Toggle Menu"
            >
              <MdMenu size={24} />
            </button>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Farm Overview
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600/60 mt-1">
            <MdCalendarMonth className="h-4 w-4" />
            <span>{currentTime.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TransitionLink
          href="/dashboard/addanimal"
          className="flex items-center gap-3 rounded-[1.5rem] bg-[#023b26] px-10 py-5 text-[11px] font-black text-white shadow-2xl transition-all hover:bg-emerald-800 hover:scale-105 active:scale-95 uppercase tracking-[0.2em]"
        >
          <span className="text-xl font-black ">+</span>
          Provision Entity
        </TransitionLink>

        <div className="h-16 w-px bg-gray-200 mx-2 hidden md:block" />

        <div className="flex items-center gap-3">
            {/* Notifications Section */}
            <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`group flex h-16 w-16 items-center justify-center rounded-[1.5rem] border transition-all shadow-sm relative ${showNotifications ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-white border-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600'}`}
                >
                    <MdNotifications className={`h-7 w-7 transition-transform ${showNotifications ? '' : 'group-hover:rotate-12'}`} />
                    <span className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white" />
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-24 right-0 w-80 bg-white rounded-3xl border border-gray-100 shadow-2xl z-[100] backdrop-blur-3xl"
                    >
                        {/* Pointy Tooltip Arrow/Pin - Seamlessly integrated */}
                        <div className="absolute -top-1 right-6.5 w-4 h-4 bg-[#023b26] rotate-45 z-0" />

                        <div className="p-6 border-b border-gray-50 bg-[#023b26] rounded-t-3xl relative z-20">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Neural Alerts</h3>
                        </div>

                        <ScrollableWrapper maxHeight="320px" className="p-2">
                            <div className="space-y-1">
                                {dummyNotifications.map(notif => (
                                    <div key={notif.id} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                                            {notif.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tight">{notif.title}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollableWrapper>

                        <TransitionLink
                          href="/dashboard/alerts"
                          onClick={() => setShowNotifications(false)}
                          className="block w-full p-4 text-center text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-colors border-t border-gray-50"
                        >
                            Access Matrix Log
                        </TransitionLink>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Profile Section */}
            <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileTooltip(!showProfileTooltip)}
                  className={`flex h-16 w-16 items-center justify-center rounded-[1.6rem] border-2 transition-all shadow-lg overflow-hidden ${showProfileTooltip ? 'border-emerald-500 scale-105' : 'border-white hover:border-emerald-200'}`}
                >
                    <div className="h-full w-full bg-[#023b26] flex items-center justify-center text-white">
                        <MdPerson size={32} />
                    </div>
                </button>

                <AnimatePresence>
                  {showProfileTooltip && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-24 right-0 w-80 bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 z-[100] backdrop-blur-3xl"
                    >
                        {/* Pointy Tooltip Arrow/Pin - Seamlessly integrated */}
                        <div className="absolute -top-1 right-6.5 w-4 h-4 bg-[#023b26] rotate-45 z-0" />

                        <div className="absolute top-0 left-0 w-full h-24 bg-[#023b26] -z-10 rounded-t-3xl" />

                        <div className="flex flex-col items-center mb-6 relative z-10">
                            <div className="h-24 w-24 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-[#023b26] mb-4 overflow-hidden">
                                <MdPerson size={48} className='size-16' />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">{userData.name}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mt-1">{userData.role}</p>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <TransitionLink
                              href="/dashboard/settings"
                              onClick={() => setShowProfileTooltip(false)}
                              className="flex items-center justify-center gap-2 w-full h-14 rounded-3xl bg-[#023b26] text-white text-[11px] font-black uppercase tracking-widest shadow-lg transition-all hover:bg-emerald-900 active:scale-95"
                            >
                                <MdSettings size={18} />
                                Profile Protocols
                            </TransitionLink>
                            <button
                              onClick={handleLogout}
                              className="flex items-center justify-center gap-2 w-full h-14 rounded-3xl bg-rose-500 text-white text-[11px] font-black uppercase tracking-widest shadow-lg transition-all hover:bg-rose-600 active:scale-95"
                            >
                                <MdLogout size={18} />
                                Authorize Logout
                            </button>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}
