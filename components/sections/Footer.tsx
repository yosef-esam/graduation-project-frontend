"use client";

import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TransitionLink } from '@/components/TransitionLink';

const Footer = () => {
  return (
    <footer className="bg-[#011a11] py-16 text-white overflow-hidden relative isolate">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />

      <div className="container mx-auto flex flex-col flex-wrap items-start justify-between gap-12 px-6 md:flex-row md:items-center">
        {/* Logo and Description */}
        <article className="flex flex-[1_1_250px] flex-col items-start">
            <TransitionLink href="/">
                <Image
                src="/images/logo.svg"
                alt="Farm AI Logo"
                width={200}
                height={100}
                className="max-w-50 mb-6 h-auto w-full"
                />
            </TransitionLink>

          <p className="max-w-xs text-emerald-100/40 text-sm font-medium leading-relaxed">
            Next-generation agricultural nodes powered by biological intelligence. 
            Synchronizing your farm&apos;s telemetry for maximum operational efficiency.
          </p>
        </article>

        {/* Quick Links */}
        <article className="flex flex-[1_1_250px] flex-col gap-10 md:flex-row">
          <div className="flex flex-col gap-3">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Nexus Hub</h3>
            <TransitionLink href="/dashboard" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Dashboard
            </TransitionLink>
            <TransitionLink href="/dashboard/herd" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Cow Tracker
            </TransitionLink>
            <TransitionLink href="/dashboard/analytics" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Sensor Data
            </TransitionLink>
            <TransitionLink href="/dashboard/alerts" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              AI Alerts
            </TransitionLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Core Matrix</h3>
            <TransitionLink href="/about" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              About Us
            </TransitionLink>
            <TransitionLink href="/careers" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Careers
            </TransitionLink>
            <TransitionLink href="/contact" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Contact
            </TransitionLink>
            <TransitionLink href="/protocols" className="text-emerald-100/40 transition hover:text-white text-sm font-bold uppercase tracking-wider">
              Protocols
            </TransitionLink>
          </div>
        </article>

        {/* Social Links */}
        <article className="flex max-h-fit flex-[1_1_250px] flex-col gap-6">
          <h3 className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Social Matrix</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-2xl bg-white/5 border border-white/5 p-4 transition hover:bg-emerald-500 hover:text-white hover:scale-110 active:scale-95 text-emerald-100/60"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="rounded-2xl bg-white/5 border border-white/5 p-4 transition hover:bg-black hover:text-white hover:scale-110 active:scale-95 text-emerald-100/60"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="#"
              className="rounded-2xl bg-white/5 border border-white/5 p-4 transition hover:bg-pink-500 hover:text-white hover:scale-110 active:scale-95 text-emerald-100/60"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="rounded-2xl bg-white/5 border border-white/5 p-4 transition hover:bg-blue-700 hover:text-white hover:scale-110 active:scale-95 text-emerald-100/60"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </article>
      </div>

      <div className="mt-20 border-t border-white/5 pt-10 text-center text-xs font-black uppercase tracking-[0.2em] text-emerald-100/20">
        &copy; {new Date().getFullYear()} FarmIQ Nexus Matrix. Precision Biological Asset Management.
      </div>
    </footer>
  );
};

export default Footer;
