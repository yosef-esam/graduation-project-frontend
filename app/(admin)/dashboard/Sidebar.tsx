"use client";

import {
  MdDashboard,
  MdPets,
  MdPeople,
  MdCloud,
  MdShield,
  MdAdd,
  MdNotificationsActive,
  MdBarChart,
  MdChat,
  MdSettings,
  MdClose
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/TransitionLink";
import ScrollableWrapper from "@/components/Dashboard/ScrollableWrapper";

export default function Sidebar({ isOpen, setIsOpenAction }: { isOpen?: boolean; setIsOpenAction?: (val: boolean) => void }) {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", icon: <MdDashboard size={22} />, href: "/dashboard" },
    { name: "HERD LIST", icon: <MdPets size={22} />, href: "/dashboard/herd" },
    { name: "PROVISIONING", icon: <MdAdd size={22} />, href: "/dashboard/addanimal" },
    { name: "HEALTH ALERTS", icon: <MdNotificationsActive size={22} />, href: "/dashboard/alerts" },
    { name: "ANALYTICS", icon: <MdBarChart size={22} />, href: "/dashboard/analytics" },
    { name: "PERSONNEL", icon: <MdPeople size={22} />, href: "/dashboard/users" },
    { name: "FARM CHAT", icon: <MdChat size={22} />, href: "/dashboard/chat" },
    { name: "SETTINGS", icon: <MdSettings size={22} />, href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-[9990] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpenAction?.(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-[9999] w-[280px] sm:w-[320px] transition-transform duration-300
        xl:sticky xl:top-4 xl:translate-x-0 xl:w-[280px] xl:h-screen
        h-full md:rounded-r-2xl xl:rounded-2xl bg-[#023b26] flex flex-col border border-[#18B772]/10 shadow-2xl shrink-0 group/sidebar overflow-hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button */}
        <button
           className="xl:hidden absolute top-6 right-6 text-white/50 hover:text-white z-50 transition-colors p-2"
           onClick={() => setIsOpenAction?.(false)}
        >
           <MdClose size={24} />
        </button>

        <ScrollableWrapper maxHeight="100%" className="no-scrollbar h-full flex flex-col">
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="p-8 flex flex-col min-h-full">
            <div className="flex items-center gap-3 mb-10 shrink-0 mt-2 xl:mt-0">
              <div className="w-12 h-12 rounded-2xl bg-[#18B772] flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                 <MdShield className="text-[#023b26]" size={28} />
              </div>
              <div>
                <h2 className="text-sm font-black text-white tracking-widest uppercase mb-0.5 leading-none">FarmIQ</h2>
                <p className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase opacity-60">Dashboard v2.4</p>
              </div>
            </div>

            <nav className="space-y-3 flex-1">
              {navItems.map((item) => {
                const isActive = item.href === "/dashboard" 
                  ? pathname === "/dashboard" 
                  : pathname.startsWith(item.href);
                return (
                  <TransitionLink
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpenAction?.(false)}
                    className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20"
                        : "text-emerald-100/40 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  </TransitionLink>
                );
              })}
            </nav>

            <div className="mt-12 shrink-0">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 mb-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 blur-[40px]" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                      <MdCloud size={22} />
                  </div>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Atmosphere</span>
                </div>
                <p className="text-2xl font-black text-white tracking-tight mb-1">22°C</p>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Partly Cloudy</p>
              </div>
            </div>
          </div>
        </ScrollableWrapper>
      </div>
    </>
  );
}
