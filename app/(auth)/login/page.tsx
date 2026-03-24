"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { loginAction, checkAuthStatus } from "@/actions/authActions";
import { TransitionLink } from "@/components/TransitionLink";
import { MdEmail, MdLock, MdArrowForward, MdShield, MdSensors, MdAutoGraph } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus().then(res => {
      if (res.isAuthenticated) setAlreadyLogged(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginAction(form);
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Identity Verified',
        text: 'Redirecting to FarmIQ matrix...',
        background: '#023b26',
        color: '#ffffff',
      });
      
      if (typeof window !== "undefined" && (window as any).triggerExitTransition) {
        try {
          await (window as any).triggerExitTransition();
        } catch (error) {
          console.error("Transition failed:", error);
        }
      }

      if (form.email === "admin@farmiq.com" && form.password === "Admin123#") {
        router.push("/superdashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Verification Refused',
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
      className="relative flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden rounded-[3.5rem] bg-white shadow-2xl border border-white isolate h-full min-h-[750px]"
    >
      {/* Side Part Integrated */}
      <div className="hidden lg:flex w-[40%] relative bg-[#023b26] overflow-hidden p-16 flex-col justify-between">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-full h-full bg-emerald-400/5 rounded-full blur-[120px]" />

          <div className="relative z-10 flex items-center gap-5">
              <Image src="/images/logo.svg" alt="FarmIQ" width={140} height={40} className="h-16 w-auto object-contain" priority />
              <div className="h-8 w-px bg-white/10" />
              <span className="text-sm font-black uppercase tracking-[0.4em] text-white/30">FarmIQ</span>
          </div>

          <div className="relative z-10">
              <h1 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-8">
                  Operational <br />
                  <span className="text-emerald-400">Authority</span> <br />
                  Control.
              </h1>
              <p className="max-w-xs text-emerald-100/30 font-bold leading-relaxed mb-12 text-[10px] uppercase tracking-[0.2em]">
                  Secure biometrics. Precision telemetry. Total authority.
              </p>

              <div className="grid grid-cols-2 gap-5">
                  {[
                      { label: 'Asset Nodes', value: '42.8k+', icon: <MdSensors /> },
                      { label: 'Sync Rate', value: '99.9%', icon: <MdShield /> },
                  ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                          <div className="flex items-center gap-2 mb-2 text-emerald-400">
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
              Authority_Node: Alpha
          </div>
      </div>

      {/* Main Form Part */}
      <div className="flex-1 flex flex-col justify-center p-12 md:p-16 lg:p-20 bg-white relative">
        <div className="mb-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Access Credentials</h2>
          <p className="font-bold text-gray-400 tracking-tighter text-sm">Verify identity for session authorization.</p>
        </div>

        {alreadyLogged && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-4 shadow-sm animate-in fade-in zoom-in duration-300">
            <MdShield size={24} className="mt-1" />
            <div>
              <h3 className="font-black uppercase tracking-tight text-sm">SWITCHING ACCOUNTS</h3>
              <p className="text-xs font-bold opacity-80 mt-1">
                You are currently logged into an active FarmIQ session. Proceeding will overwrite your current authorization tokens.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Email Identity</label>
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

          <div className="space-y-2">
            <div className="flex justify-between items-center pr-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#023b26] ml-2">Access Key</label>
              <TransitionLink href="/forgot-password" pull-right="true" className="text-[9px] font-black text-emerald-600 hover:text-[#023b26] uppercase tracking-widest transition-colors">Recover</TransitionLink>
            </div>
            <div className="relative group">
              <MdLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#023b26] transition-colors" size={20} />
              <input
                type="password"
                placeholder="••••••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="h-16 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/20 pl-14 pr-6 text-sm font-black text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-[#023b26]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#023b26] text-white transition-all hover:bg-black disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-emerald-900/10"
          >
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent transition-transform group-hover:translate-x-full duration-700" />
            <div className="relative z-10 flex items-center gap-4 font-black uppercase tracking-[0.3em] text-xs">
              {loading ? 'VERIFYING...' : 'AUTHORIZE ACCESS'}
              <MdArrowForward size={20} className="transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-gray-400 text-[12px]">
            Node unregistered?{" "}
            <TransitionLink href="/register" className="text-[#023b26] hover:text-emerald-700 transition-colors uppercase ml-1 font-black underline-offset-4 hover:underline tracking-tight">
              Request Deployment
            </TransitionLink>
          </p>
          <div className="flex items-center gap-3 text-gray-200 grayscale opacity-30">
             <MdShield size={20} />
             <MdAutoGraph size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
