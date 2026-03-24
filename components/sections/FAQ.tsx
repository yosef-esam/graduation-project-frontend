'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdArrowForward } from 'react-icons/md';

const faqs = [
  {
    question: "What geographical areas does FarmIQ cover?",
    answer: "FarmIQ operates globally, providing synchronized node infrastructure and precision biological security across diverse agricultural zones. Our systems are designed for seamless deployment regardless of location."
  },
  {
    question: "How does the node architecture integrate with existing hardware?",
    answer: "Our Multi-Node Architecture is hardware-agnostic, allowing for integration with standard sensors, collars, and monitoring devices through our secure operational protocols."
  },
  {
    question: "Is training required for the dashboard interface?",
    answer: "The FarmIQ Nexus is designed with a premium user-centric focus. While advanced features exist for data analysts, the core management dashboard is intuitive for immediate operational use."
  },
  {
    question: "What security measures protect my biological data?",
    answer: "We use end-to-end encryption, decentralized data storage, and strict access protocols to ensure your infrastructure and biological intelligence remain secure and private."
  },
  {
    question: "How often is the data synchronized across nodes?",
    answer: "Synchronization occurs in real-time. Our precision craftsmanship ensures that every node in your network is updated with the latest biological and environmental telemetry instantly."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-20 overflow-visible! bg-[#fafafa] relative isolate">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">

        {/* Sticky Intro Side */}
        <div className="lg:sticky lg:top-32 h-fit text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              FAQS
            </span>
            <h2 className="mt-6 text-3xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9] md:text-4xl">
              Answering Your <br /> <span className="text-emerald-500">Questions</span>
            </h2>
            <p className="mt-4 text-gray-400 font-bold text-sm md:text-base max-w-sm mx-auto lg:mx-0">
              Got more questions? Send us your enquiry below and our node operators will assist you.
            </p>
            <button className="mt-8 group mx-auto lg:mx-0 flex items-center gap-2 rounded-xl bg-[#023b26] px-6 py-4 text-xs font-black text-white shadow-xl transition-all hover:bg-emerald-800 hover:scale-105 active:scale-95">
              GET IN TOUCH
              <MdArrowForward size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Accordion Side */}
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-emerald-500/30 bg-white shadow-xl translate-y-[-2px]'
                  : 'bg-white/50 hover:bg-white border-black/5'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-6"
              >
                <h3 className={`text-sm md:text-base font-black uppercase tracking-tighter leading-tight transition-colors ${
                  openIndex === index ? 'text-emerald-600' : 'text-gray-900'
                }`}>
                  {faq.question}
                </h3>
                <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  openIndex === index ? 'bg-emerald-500 text-white rotate-45' : 'bg-gray-100 text-gray-400'
                }`}>
                  <MdAdd size={18} />
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out px-5 md:px-6 overflow-hidden`}
                style={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                  transition: 'height 500ms ease-in-out, opacity 400ms ease-in-out',
                  ...({ 'interpolateSize': 'allow-keywords' } as any)
                }}
              >
                <div className="pb-6">
                  <div className="h-px bg-gray-100 mb-4 w-full" />
                  <p className="text-gray-500 font-bold text-[10px] md:text-xs leading-relaxed md:pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
