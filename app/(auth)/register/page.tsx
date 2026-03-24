"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { TransitionLink } from "@/components/TransitionLink";
import { registerAction } from "@/actions/authActions";
import { MdEmail, MdLock, MdPerson, MdPhone, MdArrowForward, MdSensors, MdOutlineHub, MdShield } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    setForm({ ...form, phoneNumber: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[0-9]/g, ""); // No numbers
    setForm({ ...form, fullName: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerAction(form);
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Registration Request Dispatched',
        text: res.message || "Request sent to FarmIQ matrix.",
        background: '#023b26',
        color: '#ffffff',
      });
      setTimeout(() => {
          router.push("/login");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Registration Refused',
        text: errorMessage,
        background: '#e11d48',
        color: '#ffffff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden rounded-[3.5rem] bg-white shadow-2xl border border-white isolate h-full min-h-[800px]"
    >
      {/* Side Part Integrated */}
      <div className="hidden lg:flex w-[40%] relative bg-[#023b26] overflow-hidden p-16 flex-col justify-between">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 w-full h-full bg-emerald-400/5 rounded-full blur-[120px]" />
          
          <div className="relative z-10 flex items-center gap-5">
              <Image src="/images/logo.svg" alt="FarmIQ" width={140} height={60} className="h-16 w-auto object-contain" priority />
              <div className="h-8 w-px bg-white/10" />
              <span className="text-sm font-black uppercase tracking-[0.4em] text-white/30">FarmIQ</span>
          </div>

          <div className="relative z-10">
              <h1 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-8">
                  Security <br />
                  <span className="text-emerald-400">Node</span> <br />
                  Provisioning.
              </h1>
              <div className="grid grid-cols-2 gap-5 mb-10">
                  {[
                      { label: 'Latency', value: '4ms', icon: <MdSensors /> },
                      { label: 'Hubs', value: '742+', icon: <MdOutlineHub /> },
                  ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                          <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs">
                              {stat.icon}
                              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-100/20">{stat.label}</span>
                          </div>
                          <span className="text-xl font-black text-white tracking-tighter uppercase">{stat.value}</span>
                      </div>
                  ))}
              </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/10">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
              Operational Authority: GLOBAL
          </div>
      </div>

      {/* Main Form Part */}
      <div className="flex-1 flex flex-col justify-center p-12 md:p-16 lg:p-20 bg-white relative">
        <div className="mb-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Initialize Profile</h2>
          <p className="font-bold text-gray-400 tracking-tighter text-sm">Provision your personnel identity.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Full Identity</label>
            <div className="relative group">
              <MdPerson className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#023b26] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Operational Name"
                autoComplete="name"
                value={form.fullName}
                onChange={handleNameChange}
                required
                className="h-16 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/20 pl-14 pr-6 text-sm font-black text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-[#023b26]"
              />
            </div>
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Comms Line</label>
            <div className="relative group">
              <MdPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#023b26] transition-colors" size={20} />
              <input
                type="tel"
                placeholder="+20 1XX XXX XXXX"
                autoComplete="tel"
                value={form.phoneNumber}
                onChange={handlePhoneChange}
                required
                className="h-16 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/20 pl-14 pr-6 text-sm font-black text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-[#023b26]"
              />
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Matrix Email</label>
            <div className="relative group">
              <MdEmail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#023b26] transition-colors" size={20} />
              <input
                type="email"
                placeholder="name@farmiq.network"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-16 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/20 pl-14 pr-6 text-sm font-black text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-[#023b26]"
              />
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Access Key Override</label>
            <div className="relative group">
              <MdLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#023b26] transition-colors" size={20} />
              <input
                type="password"
                placeholder="••••••••••••"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="h-16 w-full rounded-2xl border-2 border-gray-100 bg-gray-50/20 pl-14 pr-6 text-sm font-black text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-[#023b26]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#023b26] text-white transition-all hover:bg-black disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-emerald-900/10 col-span-2 mt-4"
          >
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent transition-transform group-hover:translate-x-full duration-700" />
            <div className="relative z-10 flex items-center gap-4 font-black uppercase tracking-[0.3em] text-xs">
              {loading ? 'PROVISIONING...' : 'DISPATCH REQUEST'}
              <MdArrowForward size={20} className="transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col items-center gap-4">
          <p className="font-bold text-gray-400 text-[12px]">
            Already authorized?{" "}
            <TransitionLink href="/login" className="text-[#023b26] hover:text-emerald-700 transition-colors uppercase ml-1 font-black underline-offset-4 hover:underline tracking-tight">
              Access Matrix
            </TransitionLink>
          </p>
          <div className="flex items-center gap-4 text-gray-200 grayscale opacity-30">
             <MdShield size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
